<template>
    <router-view />
</template>

<script setup>
import { runSeeder } from "@/database/seeder";
import { useAuthStore } from "@/store/auth";

runSeeder();
const authStore = useAuthStore();

</script>
