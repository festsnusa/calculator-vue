<template lang="pug">
header.header
  span.header__left(:class="`header__left_${mode}`") calc 
  .header__right
    span.header__caption(:class="`header__caption_${mode}`") theme
    .toggle
      .toggle__caption
        span(:class="`toggle__caption_${mode}`" v-for="(_, index) in arr") {{ index+1 }}
      .toggle__box
        input.button(:class="`button_${mode}`" v-for="(value, index) in arr" type="radio" name="toggle" @click="toggle(index)" 
        :style="{ opacity: arr[index] }")
</template>

<script>
import { mapStores } from 'pinia'
import useModeStore from '@/stores/mode'

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModeStore)
  },
  data() {
    return {
      mode: 1,
      value: true,
      arr: [1, 0, 0],
    }
  },
  methods: {
    toggle(index) {
      this.modeStore.mode = index + 1
      this.arr = this.arr.map((e, j) => j == index ? 1 : 0)
    }
  },
  created() {

    this.mode = this.modeStore.mode
    this.arr = this.arr.map((e, j) => j == this.mode - 1 ? 1 : 0)

    this.modeStore.$subscribe((mutation, state) => {
      this.mode = state.mode
    })
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/vars';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;

  &__left {
    color: $white;

    &_1 {
      color: $white;
    }

    &_2 {
      color: $dark;
    }

    &_3 {
      color: $lightYellow;
    }
  }

  &__caption {
    text-transform: uppercase;
    color: $white;

    &_1 {
      color: $white;
    }

    &_2 {
      color: $dark;
    }

    &_3 {
      color: $lightYellow;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

input {
  height: 30px;
  width: 30px;
  appearance: none;
  background-color: $red;
  border-radius: 50%;
  opacity: 0;

  &:hover {
    cursor: pointer;
  }
}

.button {
  &_1 {
    background-color: $darkRed;
  }

  &_2 {
    background-color: $orange;
  }

  &_3 {
    background-color: $pureCyan;
  }
}

.toggle {

  &__caption {
    display: flex;
    justify-content: space-around;
    color: $white;

    &_1 {
      color: $white;
    }

    &_2 {
      color: $dark;
    }

    &_3 {
      color: $lightYellow;
    }
  }

  &__box {
    display: flex;
    padding: 0.5rem;
    border-radius: 50px;
    background-color: $veryDarkblue;
  }
}
</style>