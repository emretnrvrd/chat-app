<template>
  <div id="site-wrapper" class=" h-screen py-md-6 px-md-10">
    <v-card elevation="24" class="rounded-md-lg h-100 border">
      <v-layout class="h-100">
        <main-sidebar/>
        <v-main>
           <chat/>
           <chatSidebar/>
        </v-main>
      </v-layout>
    </v-card>

  </div>


</template>


<script setup>
import MainSidebar from '@/components/sidebar';
import Chat from '@/components/chat';
import chatSidebar from '@/components/chat/chatSidebar';


</script>
