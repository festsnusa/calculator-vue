<template lang="pug">
.component
  AppHeader
  main
    .screen(:class="`screen_${mode}`") {{ calculatorValue || 0 }}
    .buttons
      .buttons__main
        button.button(:class="{'del': n == 'del'}" v-for="n in calculatorElements" :key="n" @click="action(n)") {{ n }}
      .buttons__footer 
        button.reset(@click="action('reset')") reset
        button.total(@click="action('=')") =
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import { mapStores } from 'pinia';
import useModeStore from '@/stores/mode'

export default {
  name: "AppCalculator",
  components: {
    AppHeader,
  },
  computed: {
    ...mapStores(useModeStore)
  },
  data() {
    return {
      calculatorValue: '',
      calculatorElements: [7, 8, 9, 'del', 4, 5, 6, '+', 1, 2, 3, '-', '.', 0, '/', 'x'],
      operator: null,
      previousCalculatorValue: '',
      mode: 1,
    }
  },
  methods: {
    action(n) {

      if (n === '.') {
        if (this.calculatorValue.indexOf('.') > -1 || this.calculatorValue == '') return
      }

      /* Delete value */
      if (n === 'del') {
        if (this.calculatorValue.length !== 0 && this.calculatorValue !== '0') {
          this.calculatorValue = this.calculatorValue.slice(0, -1)
        }
      }

      /* Append value */
      else if (!isNaN(n) || n === '.') this.calculatorValue += n + ''

      /* Clear value */
      else if (n === 'reset') this.calculatorValue = ''

      /* Operators */
      else if (['/', 'x', '-', '+'].includes(n)) {
        this.operator = n
        this.previousCalculatorValue = this.calculatorValue
        this.calculatorValue = ''
      }

      /* Calculate result using the eval function */
      else if (n === '=') {
        this.calculatorValue = eval(
          this.previousCalculatorValue + this.operator + this.calculatorValue
        );
        this.previousCalculatorValue = ''
        this.operator = null
      }
    },
    changeBackground() {
      document.querySelector('body').style.backgroundColor = this.mode === 1
        ? 'hsl(225, 21%, 49%)'
        : this.mode === 2
          ? 'hsl(0, 0%, 90%)'
          : 'hsl(281, 89%, 26%)'
    },
  },
  created() {

    this.mode = this.modeStore.mode
    this.changeBackground()

    this.modeStore.$subscribe((mutation, state) => {
      this.mode = state.mode
      this.changeBackground()
    })
  },
}
</script>

<style lang="scss">
@import '@/assets/vars';

.component {
  max-width: 40rem;
}

body {
  background-color: $desaturatedBlue;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  &_1 {
    background-color: $desaturatedBlue;
  }

  &_2 {
    background-color: $lightGray;
  }

  &_3 {
    background-color: $darkViolet;
  }
}

.screen,
.buttons {
  border-radius: 10px;
}

.screen {
  padding: 2rem;
  margin: 2rem;
  text-align: right;

  &_1 {
    color: $white;
    background-color: $veryDarkblue;
  }

  &_2 {
    color: $darkBlue;
    background-color: $grayLight;
  }

  &_3 {
    color: $lightYellow;
    background-color: $darkViolet;
  }
}

.buttons {

  background-color: $veryDarkblue;
  margin: 2rem;
  padding: 2rem;
  min-width: 10rem;

  &__main {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);

  }

  &__footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

}

.button {
  cursor: pointer;
  background-color: $greyOrange;
  border-radius: 10px;
  max-width: 6rem;
  padding: 1rem;
  color: $greyBlue;
  font-size: $fontSize;
  font-weight: 700;
  margin: 1rem;
}

.del,
.reset {
  background-color: $desaturatedBlue;
  color: $white;
  text-transform: uppercase;
  text-align: center;
}

.reset,
.total {
  border-radius: 10px;
  padding: 1rem;
  font-size: $fontSize;
  font-weight: 700;
  margin: 1rem;
}

.total {
  background-color: $red;
  color: $white;
}
</style>