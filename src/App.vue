<template>
    <router-view />
</template>

<script setup>
import { runSeeder } from "@/database/seeder";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";
import Auth from "./models/Auth";

runSeeder();
const authStore = useAuthStore();
onMounted(() => {
  console.log(authStore);
  const auth = Auth.getAll()[0];
  if(auth){
    authStore.setUser(auth.attrs.user_id)
  }
})

</script>
