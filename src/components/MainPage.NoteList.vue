<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import toast from '@/plugins/toast';
import { computed } from 'vue';
import { DataBaseNotes, Icon, IconType } from '@/types/sharedTypes';
import { setActiveNote, newActiveNote } from '@/services/firebase';
import { dateFormat } from '@/utils/sharedUtils';

const props = defineProps<{
  userId: string;
  database?: DataBaseNotes
}>();
const database = computed(() => [...props.database?.values() ?? []]?.sort((a, b) => b.lastupdated - a.lastupdated));
const getNote = (id: string) => {
  let note = props.database?.get(id);
  note ? setActiveNote(note) :  newNote();
  toast('Get Note: ' + id)
};

const newNote = () => {
  toast('New Note');
  newActiveNote();
}

</script>

<template>
  <div class="note-list-container">
    <div class="list-header">
      <label class="header">Notes</label>
      <div class="list-options">
        <IconButton
          :type="IconType.Border"
          :icon="Icon.Add"
          :action="newNote"
        />
      </div>
    </div>
    <ul class="list">
      <li
        v-for="n in database"
        :key="n.id"
        class="list-item-container"
      >
        <button
          class="list-item"
          @click="() => getNote(n.id)"
        >
          <div class="list-item-header">
            {{ n.title.replaceAll('&nbsp;', ' ') }}
          </div>
          <div class="list-item-content">
            {{ n.body.replaceAll('&nbsp;', ' ') }}
          </div>
          <div class="list-item-date">
            Updated: {{ dateFormat(n.lastupdated) }}
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  $gap: 1rem;

  .note-list-container {
    grid-area: var(--list-area);
    max-width: var(--note-list-width);
    max-height: 100%;
    overflow-y: auto;
    padding-bottom: 3rem;
    box-shadow: 1px 0 0 var(--n-300);
    flex: 1;
    display: contents;
    @include tabletUp {
      display: grid;
      grid-template-rows: var(--toolbar-height) 1fr;
    }
  }
  .list-header {
    background-color: var(--black);
    position: sticky;
    top: var(--list-header-top);
    align-items: center;
    display: flex;
    place-self: center start;
    gap: .5rem;
    padding: 0 1rem;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    border-bottom: 1px solid var(--n-400);
    z-index: 1;
  }
  .header {
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 700;
  }
  .list-options {
    display: flex;
  }
  .btn  {
    border: none;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
  }
  .to-notes-btn {
    gap: .125rem;
  }
  .list {
    background-color: var(--black);
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: hidden;
    overflow-y:auto;
    list-style: none;
    padding: 0 0 3rem 0;
    margin: 0;
    scroll-snap-type: y mandatory;
  }
  .list-item-container {
    scroll-snap-align: start;
    &:not(:last-child) {
      box-shadow: 0 1px 0 var(--n-300);
    }
    &:active {
      &,
      .list-item-content:after {
        background-color: var(--n-100);
      }
    }
  }
  .list-item {
    background-color: transparent;
    border: none;
    display: grid;
    gap: .325rem;
    line-height: 1.375;
    padding: 1rem;
    place-content: start start;
    text-align: left;
    width: 100%;
    height: min-content;
    position: relative;
  }
  .list-item-header {
    font-size: var(--list-item-font-size);
    font-weight: 700;
  }
  .list-item-content {
    color: hsl(0, 0%, 64%);
    font-size: var(--list-item-font-size);
    line-height: var(--list-item-line-height);
    max-height: calc(var(--list-item-line-height) * 4);
    overflow: hidden;
    white-space-collapse: break-spaces;
    position: relative;
    &:after {
      content: "...";
      display: block;
      letter-spacing: .125rem;
      position: absolute;
      padding-left: .5rem;
      height: var(--list-item-line-height);
      width: 100%;
      background: #000;
      top: calc(var(--list-item-line-height) * 3);
      right: 0;
    }
  }
  .list-item-date {
    margin-top: .5rem;
    font-size: .625rem;
    color: var(--n-400);
  }
</style>