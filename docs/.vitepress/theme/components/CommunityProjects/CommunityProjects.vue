<script setup lang="ts">
import { communityProjectCardData, communityProjectCategories as categories } from '@theme/data/community-projects';
import type { CommunityProjectCategory } from '@theme/data/community-projects';
import CardSingle from '@theme/components/CardLists/CardSingle.vue';
</script>
<script lang="ts">
export default {
  props: {},
  data() {
    return {
      selectedCategories: {}
    }
  },
  methods: {
    clearSelectedCategories() {
      this.selectedCategories = {};
    },
    toggleSelectedCategory(category: CommunityProjectCategory) {
      if (this.selectedCategories[category]) {
        const { [category]: c, ...newSelectedCategories} = this.selectedCategories;
        this.selectedCategories = newSelectedCategories;
      } else {
        this.selectedCategories[category] = true;
      }
    }
  }
}
</script>

<template>
  <div class="community-project-categories">
    <div class="section-label filter">
      <span>Filter by Category</span>
      <button :class="!Object.keys(selectedCategories).length && 'disabled'" @click="clearSelectedCategories">Clear Filters</button>
    </div>
    <button v-for="(category, key) in categories"
      class="project-category button"
      :class="selectedCategories[key] && 'selected'"
      :style="{'--category-rgb': category.rgb}"
      @click="() => toggleSelectedCategory(key)"
    >
      {{ category.titlePlural ? category.titlePlural : category.title }}
    </button>
  </div>

  <div class="community-projects">
    <template v-for="project of communityProjectCardData">
    <a v-if="!Object.keys(selectedCategories).length || Object.keys(selectedCategories).includes(project.category)"
      class="project-item"
      :href="project.itemUrl"
    >
      <CardSingle>
        <div class="item-content">
          <img :src="project.thumbnailUrl" />

          <div class="item-description">
            <div class="description-heading">
              <span class="project-title">{{ project.title }}</span>
              <span class="project-category" :style="{'--category-rgb': categories[project.category].rgb}">{{ categories[project.category].title }}</span>
            </div>
            <p v-html="project.description" />
          </div>

        </div>
      </CardSingle>
    </a>
  </template>
  </div>
</template>

<style scoped lang="scss">

.community-projects {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 52px;
  @media (max-width: 790px) {
    grid-template-columns: 1fr;
  }
}

.card {
  backdrop-filter: none;
  :root.dark & {
    backdrop-filter: none;
  }
}

.project-item {
  align-self: flex-start;
  color: var(--vp-c-text-1);
  border-radius: 16px;
  overflow: hidden;
  transition: 0.14s ease;
  transition-property: background-color, box-shadow, color, transform;
  cursor: pointer;
  :root:not(.dark) & {
    &:not(:hover) {
      background-color: rgba(236, 236, 244, 0.32);
    }
  }
  &:hover {
    color: #000;
    box-shadow: 0 14px 36px -24px rgba(0,40,100,0.24);
    background-color: rgba(236, 236, 244, 0.2);
    transform: translateY(-3px);
    :root.dark & {
      color: #fff;
      background-color: rgba(185, 222, 255, 0.06);
    }
  }
}

.item-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px;
  img {
    max-height: 214px;
    object-fit: cover;
    object-position: center 0;
    margin: 0;
    border-radius: 8px;
    :root:not(.dark) & {
      box-shadow: 0 1px 2px 0 rgba(196, 208, 217, 0.6);
    }
  }
}

.item-description {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 20px 16px;
  p,
  a {
    margin: 0;
    color: var(--vp-c-text-2);
    font-size: 13px;
    line-height: 1.6;
  }
}

.description-heading {
  display: flex;
  gap: 24px;
  justify-content: space-between;
  align-items: flex-end;
}

.project-title {
  font-size: 16px;
  font-weight: 600;
}

.project-category {
  --category-color-opacity: 0.6;
  padding: 2px 18px;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(var(--category-rgb), var(--category-color-opacity));
}


.community-project-categories {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 60px 0 40px;
  padding: 24px 16px;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(196, 208, 217, 0.32);
  background-color: rgba(236, 236, 244, 0.1);
  :root.dark & {
    box-shadow: inset 0 0 0 1px rgba(193, 228, 255, 0.1);
    background-color: rgba(185, 222, 255, 0.03);
  }
  @media (max-width: 500px) {
    padding: 16px 8px;
  }
}

.section-label {
  position: absolute;
  display: flex;
  gap: 24px;
  top: -32px;
  left: 22px;
  color: var(--vp-c-text-2);
  &::before {
    position: absolute;
    content: '';
    top: 50%;
    left: -22px;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background-color: var(--vp-c-text-2);
    -webkit-mask-position: center;
            mask-position: center;
    -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
    -webkit-mask-size: contain;
            mask-size: contain;
  }
  &.filter::before {
    -webkit-mask-image: url('/icons/fa-bars-filter-regular.svg');
            mask-image: url('/icons/fa-bars-filter-regular.svg');
  }

  span,
  button {
    font-size: 12px;
    font-weight: 600;
    transition: 0.1s ease;
    transition-property: color;
    &.disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
  button:not(.disabled):hover {
    color: var(--vp-c-text-1);
    text-decoration: underline;
    text-underline-position: under; 
  }
}

.project-category.button {
  padding: 10px 24px;
  font-size: 13px;
  line-height: 1.2;  
  transition: 0.1s ease box-shadow;
  
  @media (max-width: 500px) {
    padding: 8px 18px;
    font-size: 12px;
  }
  
  &:hover {
    --category-color-opacity: 0.8;
    :root:not(.dark) & {
      color: #000;
      background-color: #fff;
      box-shadow:
        inset 0 0 0 1px rgba(var(--category-rgb), var(--category-color-opacity)),
        0 2px 16px -8px rgba(var(--category-rgb), 0.8);
    }
    :root.dark & {
      color: #fff;
      background-image: radial-gradient(ellipse at bottom, rgba(var(--category-rgb), 0.24), transparent);
    }
  }

  &.selected {
    box-shadow: inset 0 0 0 2px rgba(var(--category-rgb), var(--category-color-opacity)) !important;
    :root:not(.dark) & {
      color: #000;
      background-image: radial-gradient(ellipse at top, rgba(var(--category-rgb), 0.05), 80%, rgba(var(--category-rgb), 0.1));
    }
    :root.dark & {
      color: #fff;
      background-image: radial-gradient(ellipse at bottom, rgba(var(--category-rgb), 0.4), rgba(var(--category-rgb), 0.2));
    }
  }
}


</style>