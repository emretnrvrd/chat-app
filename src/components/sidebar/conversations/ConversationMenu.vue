<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-if="asButton" icon>
        <v-icon :icon="icon" v-bind="props" />
      </v-btn>
      <v-icon v-else :icon="icon" v-bind="props" />
    </template>

    <v-list density="compact" @click="null" elevation="4" >
      <v-list-item value="delete">
        <v-list-item-title> <v-icon icon="mdi-delete" class="mr-4"/> Delete </v-list-item-title>
      </v-list-item>
      <v-list-item value="pin" @click="null">
        <v-list-item-title> <v-icon icon="mdi-pin" class="mr-4"/> Pin </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: 'mdi-chevron-down'
  },
  conversation: {
    type: Object,
  },
  asButton: {
    type: Boolean,
    default: false,
  }
});
const { icon, conversation, asButton } = toRefs(props);
</script>
