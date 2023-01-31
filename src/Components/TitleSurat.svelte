<script>
 //@ts-nocheck
  import {Row, Col} from 'svelte-materialify'
  import { navigate } from 'svelte-navigator'
  export let num
  export let arab
  export let arti
  export let nama

  function openSurah () {
    localStorage.setItem('index', num)
    navigate('surah')
  }
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<div class="mb-2">
  <a href="#" on:click|preventDefault={openSurah}>
    <div class="quran-title elevation-2 rounded pl-2 pr-2">
      <Row class="ma-0 pa-0">
        <div class="float-left">
          <small class="green-text font-weight-black">{num}</small>
        </div>
      </Row>
      <Row class="ma-0 pa-0">
        <Col cols=6 class="pa-0">
        <p class="text-h6 mb-0 black-text">
          {nama}
        </p>
        <small class="grey-text">({arti})</small>
        </Col>
        <Col cols=6 class="pa-0 green-text">
          <p class="arab font-kitab-bold float-right mb-0">
            {arab}
          </p>
          </Col>
      </Row>
    </div>
  </a>
</div>

<style>
    .quran-title {
    border-left-style: solid;
    border-left-color: green;
    border-left-width: 8px;
  }

   .arab {
    font-size: 30px;
  }

  a {
    text-decoration: none;
    color: green;
  }
</style>