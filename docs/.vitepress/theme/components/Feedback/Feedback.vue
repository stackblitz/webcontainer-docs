<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute } from 'vitepress';
import LoadingIcon from '@theme/components/Icons/LoadingIcon.vue';
import { sendEvent } from '@theme/scripts/gtag';

enum FeedbackState {
  START = 'START',
  YES = 'YES',
  NO = 'NO',
  END = 'END',
}

const route = useRoute();
const currentState = ref(FeedbackState.START);
const feedback = ref('');
const isSending = ref(false);
const hasError = ref(false);

function onButtonClick(value: FeedbackState.YES | FeedbackState.NO) {
  currentState.value = value;
  sendEvent({
    eventName: 'wc_doc_feedback_helpful',
    pagePath: route.path,
    value,
  });
}

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

// We send a form to Netlify: https://docs.netlify.com/forms/setup/
function submitForm() {
  isSending.value = true;
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
      <template v-if="currentState === FeedbackState.START">
        <p class="title">Was this page helpful?</p>
        <div class="buttonContainer">
          <button class="button" @click="onButtonClick(FeedbackState.YES)">
            <span class="icon thumbsUp"></span> Yes
          </button>
          <button class="button" @click="onButtonClick(FeedbackState.NO)">
            <span class="icon thumbsDown"></span>No
          </button>
        </div>
      </template>
      <template v-else-if="[FeedbackState.YES, FeedbackState.NO].includes(currentState)">
        <form
          class="form"
          name="doc-feedback"
          method="post"
          @submit.prevent="submitForm"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="doc-feedback" />
          <label class="title label" for="feedback">
            <template v-if="currentState === FeedbackState.YES"> What was most helpful? </template>
            <template v-else> What should we improve? </template>
          </label>
          <textarea
            id="feedback"
            name="feedback"
            class="textarea"
            v-model="feedback"
            autofocus
          ></textarea>
          <button class="button" type="submit" :disabled="feedback.length === 0">
            <LoadingIcon v-if="isSending" :size="11" />Submit
          </button>
          <p v-if="hasError" class="error">Sorry, something went wrong. Please try it again later.</p>
        </form>
      </template>
      <template v-else-if="currentState === FeedbackState.END">
        <p class="end">Thank you for helping improve our documentation! &#9829;</p>
      </template>
    </div>
  </template>

<style scoped lang="scss">
.feedbackContainer {
  margin-block-start: 50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  background-color: var(--vp-c-bg);
}

.buttonContainer {
  display: flex;
  gap: 16px;
}

.title {
  font-weight: 700;
  font-size: 18px;
}

.label {
  display: block;
  margin-block-end: 10px;
}

.button {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
  border-radius: 6px;
  padding: 4px 10px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover {
    background-color: var(--vp-c-brand-dark);
  }
}

.icon {
  display: block;
  width: 16px;
  height: 16px;
  background-color: var(--vp-c-bg);
}

.thumbsUp {
  -webkit-mask: url('/icons/fa-thumbs-up.svg') center/contain no-repeat;
  mask: url('/icons/fa-thumbs-up.svg') center/contain no-repeat;
}

.thumbsDown {
  -webkit-mask: url('/icons/fa-thumbs-down.svg') center/contain no-repeat;
  mask: url('/icons/fa-thumbs-down.svg') center/contain no-repeat;
}

.form {
  width: 100%;
}

.textarea {
  width: 100%;
  height: 80px;
  padding: 6px 10px;
  margin-block-end: 10px;
  border: 1px solid var(--vp-c-gray-dark-2);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  font-family: inherit;
  &:focus-visible {
    outline: solid 2px var(--sb-foreground-highlight);
    outline-offset: -2px;
  }
}

.error {
  margin-block-start: 10px;
  color: var(--vp-custom-block-danger-text);
}

.end {
  flex: 1;
  text-align: center;
}
</style>
