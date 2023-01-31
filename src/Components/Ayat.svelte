<script>
//@ts-nocheck
  import {Card, CardText, Button, Icon, Dialog} from 'svelte-materialify'
  import {mdiBook, mdiPlay, mdiPause } from '@mdi/js'
  export let textarab;
  export let arti;
  export let tafsiran;
  export let long;
  export let audiodata
  export let num;

  let play = false
  let tafsir = false

  let audionya = new Audio(audiodata)

  function PlayAudio () {
    audionya.play()
    play = true
  }

  function PauseAudio () {
    audionya.pause()
    play = false
  }

  audionya.onended = () => { play = false}
</script>

<Card class="pl-2 pr-2 mb-1">
  <div>
    <p class="mb-0 font-weight-bold">{num}</p>
  </div>
  <div>
    <p class="font-kitab-bold ayat">{textarab}</p>
  </div>
  <div>
    <p class="mb-0">{arti}</p>
  </div>
  <CardText class="pa-0">
    <Button text fab depressed on:click={() => tafsir = true}>
      <Icon path={mdiBook}/>
    </Button>
    {#if play}
      <Button text fab depressed on:click={PauseAudio}>
        <Icon path={mdiPause}/>
      </Button>
    {:else}
      <Button text fab depressed on:click={PlayAudio}>
        <Icon path={mdiPlay}/>
      </Button>
    {/if}
  </CardText>
</Card>

<Dialog class="pa-4 text-center" bind:active={tafsir}>
  <p class="text-h5">Tafsir Ayat</p>
  <p>
    {tafsiran}
  </p>
  <br>
  <p>
    {long}
  </p>
  <Button text on:click={() => tafsir = false}>
    tutup
  </Button>
</Dialog>

<style>
    .ayat {
    font-size: 20px;
  }
</style>