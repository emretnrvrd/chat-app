<template>
  <v-toolbar v-if="false">
      <v-app-bar-nav-icon>
        <v-avatar size="30" image="https://cdn.britannica.com/05/236505-050-17B6E34A/Elon-Musk-2022.jpg"/>
      </v-app-bar-nav-icon>

      <v-spacer/>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list density="compact" @click="null" elevation="4">
        <v-list-item value="new_conversation">
          <v-list-item-title> <v-icon icon="mdi-account" class="mr-4"/> New Conversation </v-list-item-title>
        </v-list-item>
        <v-list-item value="new_group">
          <v-list-item-title> <v-icon icon="mdi-account-group" class="mr-4"/> New Group </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-toolbar>

    <v-card>

    </v-card>
    <v-layout v-if="true">
      <v-app-bar >
      <template v-slot:prepend>
        <v-avatar size="30" image="https://cdn.britannica.com/05/236505-050-17B6E34A/Elon-Musk-2022.jpg"/>
      </template>
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
                <v-list-item-title> <v-icon icon="mdi-account" class="mr-4"/> New Conversation </v-list-item-title>
              </v-list-item>
              <v-list-item value="new_group">
                <v-list-item-title> <v-icon icon="mdi-account-group" class="mr-4"/> New Group </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </template>
      <v-main></v-main>
      </v-app-bar>
    </v-layout>





  <v-card max-width="448" class="mx-auto" elevation="0">
    <v-layout>
      <v-app-bar scroll-behavior="hide" scroll-target="#conversation-list">
        <v-app-bar-nav-icon>
          <v-avatar size="30" image="https://cdn.britannica.com/05/236505-050-17B6E34A/Elon-Musk-2022.jpg"/>
        </v-app-bar-nav-icon>

        <!-- <v-app-bar-title>My Recent Trips</v-app-bar-title> -->

        <template v-slot:append>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon icon="mdi-dots-vertical"></v-icon>
              </v-btn>
            </template>

            <v-list density="compact" @click="null" elevation="4">
              <v-list-item value="new_conversation">
                <v-list-item-title> <v-icon icon="mdi-account" class="mr-4"/> New Conversation </v-list-item-title>
              </v-list-item>
              <v-list-item value="new_group">
                <v-list-item-title> <v-icon icon="mdi-account-group" class="mr-4"/> New Group </v-list-item-title>
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
