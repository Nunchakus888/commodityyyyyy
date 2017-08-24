<template>
  <main>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="search">
      <slot name="search"></slot>
    </div>
    <slot name="operation"></slot>
    <div class="table">
      <slot name="table"></slot>
    </div>
    <div class="pager">
      <slot name="pager"></slot>
    </div>
  </main>
</template>
<style scoped lang="less">
  .header,
  .table,
  .pager {
    padding-bottom: 20px;
  }

  .pager {
    text-align: right;
  }
</style>