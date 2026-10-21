<template>
  <div class="spinner">
    <img :src="'img/loader.svg'" class="svg-icon" alt="Loading...">
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
}

.svg-icon {
  width: 60px;
  height: 60px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>