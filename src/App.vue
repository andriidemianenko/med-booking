<template>
  <div class="main-container">
    <router-view/>
  </div>
</template>

<style>
.main-container {
  width:100%;
  height: 100vh;
}
.f-dir-col {
  flex-direction: column;
}
.f-dir-row {
  flex-direction: row;
}
.f-justify-center {
  justify-content: center;
}
.f-align-center {
  align-items: center;
}
</style>
