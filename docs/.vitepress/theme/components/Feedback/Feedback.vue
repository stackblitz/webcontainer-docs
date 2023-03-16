<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import LoadingIcon from '@theme/components/Icons/LoadingIcon.vue';
import { sendEvent } from '@theme/scripts/gtag';
import CardSingle from '@theme/components/CardLists/CardSingle.vue';

enum FeedbackState {
  START = 'START',
  YES = 'YES',
  NO = 'NO',
  END = 'END',
}

const route = useRoute();
const currentState = ref(FeedbackState.START);
const feedback = ref('');
const feedbackTextarea = ref<HTMLInputElement | null>(null);
const isSending = ref(false);
const hasError = ref(false);

function onButtonClick(value: FeedbackState.YES | FeedbackState.NO) {
  // don't change state if opposite button is active.
  const opposingState = value === FeedbackState.YES ? FeedbackState.NO : FeedbackState.YES;
  if ([opposingState].includes(currentState.value)) {
    return;
  }
  currentState.value = value;
  nextTick(() => feedbackTextarea.value?.focus());
}

function cancelForm() {
  currentState.value = FeedbackState.START;
}

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

// We send a form to Netlify: https://docs.netlify.com/forms/setup/
function submitForm() {
  isSending.value = true;
  sendEvent({
    eventName: 'wc_doc_feedback_helpful',
    pagePath: route.path,
    value: currentState.value,
  });
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({
      'form-name': 'webcontainer-api-doc-feedback',
      page: route.path,
      wasHelpful: currentState.value,
      feedback: feedback.value,
    }),
  })
    .then(() => {
      currentState.value = FeedbackState.END;
      feedback.value = '';
      hasError.value = false;
    })
    .catch((error) => {
      hasError.value = true;
    })
    .finally(() => {
      isSending.value = false;
    });
}

// Reset the states on page change
watch(
  () => route.path,
  () => {
    currentState.value = FeedbackState.START;
    feedback.value = '';
    hasError.value = false;
  }
);
</script>

<template>
    <div class="feedbackContainer">

      <form name="webcontainer-api-doc-feedback" data-netlify="true" hidden>
        <textarea name="feedback"></textarea>
        <input name="wasHelpful" />
        <input name="page" />
      </form>

        <p class="title">Was this page helpful?</p>
        <div class="buttonContainer">

          <CardSingle :link="![FeedbackState.NO].includes(currentState)">
            <button class="button"
              :class="
                [FeedbackState.YES].includes(currentState) && 'active',
                [FeedbackState.NO].includes(currentState) && 'deselected'
              "
              @click="onButtonClick(FeedbackState.YES)"
            >
              <span class="icon thumbsUp"></span> Yes
            </button>
          </CardSingle>

          <CardSingle :link="![FeedbackState.YES].includes(currentState)">
            <button class="button"
              :class="
                [FeedbackState.NO].includes(currentState) && 'active',
                [FeedbackState.YES].includes(currentState) && 'deselected'
              "
              @click="onButtonClick(FeedbackState.NO)"
            >
              <span class="icon thumbsDown"></span> No
            </button>
          </CardSingle>

          <button v-if="[FeedbackState.YES, FeedbackState.NO].includes(currentState)" class="cancel" @click="cancelForm">Cancel</button>
        </div>

      <template v-if="[FeedbackState.YES, FeedbackState.NO].includes(currentState)">
        <form
          class="form"
          name="doc-feedback"
          method="post"
          @submit.prevent="submitForm"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="doc-feedback" />
          <label class="title label" for="feedback">
            <template v-if="currentState === FeedbackState.YES"><span class="icon thumbsUp"></span> What did you find most helpful? </template>
            <template v-else><span class="icon thumbsDown"></span> What should we improve? </template>
          </label>
          <textarea
            id="feedback"
            name="feedback"
            class="textarea"
            v-model="feedback"
            ref="feedbackTextarea"
            autofocus
          ></textarea>
          <button class="button submit" type="submit" :disabled="feedback.length === 0">
            <LoadingIcon v-if="isSending" :size="11" />Submit
          </button>
          <p v-if="hasError" class="error">Sorry, something went wrong. Please try it again later.</p>
        </form>
      </template>

      <template v-else-if="currentState === FeedbackState.END">
        <p class="end">Thank you for helping improve our documentation! <span class="red">&#9829;</span></p>
      </template>

    </div>
  </template>

<style scoped lang="scss">
.feedbackContainer {
  --icon-color-green: rgb(0, 185, 163);
  --icon-color-red: rgb(246, 96, 151);
  margin-block-start: 84px;
  margin-block-end: -8px;
  padding-block-start: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  background-color: var(--vp-c-bg);
  border-top: solid 1px var(--vp-c-bg-soft);
}

.buttonContainer {
  display: flex;
  gap: 6px;
}

.title {
  color: var(--vp-c-text-2);
  font-weight: 500;
  font-size: 13px;
}
.cancel {
  padding: 0 16px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 500;
  text-decoration: underline;
  &:hover {
    color: var(--vp-c-text-1);
  }
}

.label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-block-end: 10px;
  color: var(--vp-c-text-1);
}

.button {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 500;
  padding: 2px 12px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.active,
  &:hover:not(.deselected):not(.submit:disabled) {
    color: var(--vp-c-text-1);
    background-color: rgba(255,255,255,0.5);
  }
  &.active {
    cursor: default;
  }

  :root.dark &.active,
  :root.dark &:hover:not(.deselected):not(.submit:disabled) {
    background-color: var(--vp-c-bg-soft);
  }

  &.deselected {
    opacity: 0.4;
    cursor: default;
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
  }
}

.icon {
  display: block;
  width: 12px;
  height: 12px;
  background-color: var(--vp-c-text-3);
}

.thumbsUp {
  -webkit-mask: url('/icons/fa-thumbs-up.svg') center/contain no-repeat;
  mask: url('/icons/fa-thumbs-up.svg') center/contain no-repeat;
}
.title.label .thumbsUp,
.button.active .thumbsUp,
.button:hover:not(.deselected) .thumbsUp {
  background-color: var(--icon-color-green);
}

.thumbsDown {
  -webkit-mask: url('/icons/fa-thumbs-down.svg') center/contain no-repeat;
  mask: url('/icons/fa-thumbs-down.svg') center/contain no-repeat;
}
.title.label .thumbsDown,
.button.active .thumbsDown,
.button:hover:not(.deselected) .thumbsDown {
  background-color: var(--icon-color-red);
}

.form {
  width: 100%;
}

.textarea {
  width: 100%;
  height: 80px;
  padding: 6px 10px;
  margin-block-end: 6px;
  border: 1px solid var(--vp-c-gray-dark-2);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  font-family: inherit;
  &:focus-visible {
    outline: solid 1px var(--sb-foreground-highlight);
    outline-offset: -1px;
  }
}

.button.submit {
  margin-block-end: 24px;
  padding: 8px 32px;
  font-size: 12.5px;
  font-weight: 600;
  border-radius: 24px;
  box-shadow: inset  0 0 0 1px var(--vp-c-bg-soft);
}

.error {
  margin-block-start: 10px;
  color: var(--vp-custom-block-danger-text);
}

.end {
  flex: 1;
  text-align: center;
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.5;
  font-weight: 500;
  padding: 2px 12px;
  .red {
    color: var(--icon-color-red);
  }
  @media screen and (max-width: 600px) {
    min-width: 200px;
    font-size: 11.5px;
  }
}
</style>
