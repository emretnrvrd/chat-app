<template>
    <v-toolbar class="py-2 px-3">
      <v-text-field
            placeholder="Search"
            variant="solo"
            hide-details
            class="elevation-0 py-10"
          >
          <template v-slot:prepend-inner>
            <v-btn v-if="true"  icon disabled>
              <v-icon icon="mdi-magnify"/>
            </v-btn>
            <v-btn v-else icon @click="null">
              <v-icon  icon="mdi-chevron-left" />
            </v-btn>
          </template>
        </v-text-field>
    </v-toolbar>
</template>


<script setup>
import { computed, ref } from "vue";
import _ from 'lodash';


// const searchText = ref('');
// const isEmpty = computed(() => _.isEmpty(searchText.value.trim()) );

// const clear = () => searchText.value = '';
</script>
