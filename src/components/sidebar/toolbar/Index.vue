<template>
  <v-layout v-if="false">
    <v-app-bar>
      <template v-slot:prepend>
        <v-avatar size="30" :image="authStore.authUser.attrs.photo" />
      </template>

      <v-app-bar-title>{{ authStore.authUser.attrs.name }}</v-app-bar-title>

      <template v-slot:append>

        <v-btn icon>
          <v-icon icon="mdi-magnify"></v-icon>
        </v-btn>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon icon="mdi-dots-vertical"></v-icon>
            </v-btn>
          </template>

          <v-list density="compact" @click="null" elevation="4">
            <v-list-item value="new_conversation">
              <v-list-item-title> <v-icon icon="mdi-account" class="mr-4" /> New Conversation </v-list-item-title>
            </v-list-item>
            <v-list-item value="new_group">
              <v-list-item-title> <v-icon icon="mdi-account-group" class="mr-4" /> New Group </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <v-main></v-main>
    </v-app-bar>
  </v-layout>


  <v-card elevation="0">
    <v-layout>
      <v-app-bar scroll-behavior="hide" scroll-target="#conversation-list">
        <v-app-bar-nav-icon>
          <v-avatar size="30" :image="authStore.authUser.attrs.photo" />
        </v-app-bar-nav-icon>
        <v-app-bar-title class="font-weight-bold">{{ authStore.authUser.attrs.name }}</v-app-bar-title>


        <template v-slot:append>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon icon="mdi-dots-vertical"></v-icon>
              </v-btn>
            </template>

            <v-list density="compact" elevation="4" v-model.opened="open">


                <v-list-item  v-for="user in users" :key="user.attrs.id" :value="user.attrs.id">
                  <v-list-item-title @click="authStore.setUser(user.attrs.id)">
                    <v-icon icon="mdi-account" class="mr-4" />
                    Switch to {{ user.attrs.name }}
                  </v-list-item-title>
                </v-list-item>





            </v-list>
          </v-menu>
        </template>
      </v-app-bar>

      <v-main>

      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import User from "@/models/User";
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";
const authStore = useAuthStore();

const open = ref(['Users']);

const users = ref(User.getAll());

</script>
