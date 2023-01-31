<script>
  //@ts-nocheck
	import { Card, CardText, Button, Dialog, ProgressCircular, Icon} from 'svelte-materialify';
  import TopLine from '../assets/top.png'
  import BtmLine from '../assets/btm.png'
  import Ayat from '../Components/Ayat.svelte'
  import { onDestroy, onMount } from 'svelte';
  import { DetailSurat, audioQuran } from '../lib/store'
  import {mdiArrowLeft} from '@mdi/js'
  import {useNavigate} from 'svelte-navigator'

  let goBack = useNavigate()
  let numberOfsurat = localStorage.getItem('index')

  let ket = false

  function goHome () {
    goBack(-1)
    localStorage.removeItem('index')
  }
  onMount(async() => {
    try {
      const getSurat = await fetch(`https://api.quran.gading.dev/surah/${numberOfsurat}`)
      const dataSurat = await getSurat.json()
      DetailSurat.set(dataSurat.data)
    } catch {
      console.log('error')
    }

    try {
      const getAudio = await fetch(`https://quran-api-id.vercel.app/surahs/${numberOfsurat}`)
      const result = await getAudio.json()
      console.log(result.audio)
      audioQuran.set(result.audio)
    } catch {
      console.log('error')
    }
  })

  onDestroy(() => {
    DetailSurat.set()
  })

$: if ($DetailSurat) {
  console.log('sudah ada data')
} else {
  console.log('tidak ada data')
}

</script>

{#if $DetailSurat}
  <div class="title green pl-2 pr-2 pt-2 pb-16">
    <Card class="text-center">
        <img src={TopLine} alt="___" class="mb-0 pb-0 topline">
        <p class="font-kitab-bold arab mb-0">
          {$DetailSurat.name.long}
        </p>
        <p class="mb-0">({$DetailSurat.name.translation.id})</p>
        <img src={BtmLine} alt="___" class="mt-0 bt-0 ">
        <CardText class="pa-0 pb-3">
          <Button text on:click={() => { ket = !ket}}>
            Keterangan Surat
          </Button>
        </CardText>
    </Card>
    <div class="white divider mt-5 elevation-3 mb-5">
    </div>
  
    {#each $DetailSurat.verses as ayat}
      <Ayat 
        textarab={ayat.text.arab}
        arti={ayat.translation.id}
        tafsiran={ayat.tafsir.id.short}
        audiodata={ayat.audio.primary}
        num={ayat.number.inSurah}
        long={ayat.tafsir.id.long}
      />
    {/each}
  </div>
  
  {#if $audioQuran}
    <div class="d-flex justify-center player">
      <audio src={$audioQuran} controls></audio>
    </div>
  {/if}

{:else}
  <div class="oj d-flex justify-center align-center">
    <ProgressCircular size={70} width={7} indeterminate color="success" />
  </div>
{/if}

<Dialog class="pa-4 text-center" bind:active={ket}>
  <p class="text-h5">Keterangan Surat</p>
  <p class="align-left">
    {$DetailSurat.tafsir.id}
  </p>
  <Button text on:click={() => { ket = !ket}}>
    tutup
  </Button>
</Dialog>

{#if $DetailSurat}
  <div class="back">
    <Button fab size="small" class="green white-text" on:click={goHome}>
      <Icon path={mdiArrowLeft} />
    </Button>
  </div>
{/if}

<style>
  .back {
    position: fixed;
    top: 10px;
    left: 10px;
  }
  .oj {
    height: 100vh;
  }
  .player {
    width: 100%;
    position: fixed;
    bottom: 10px;

  }

  .divider {
    width: 100%;
    height: 5px;
    border-radius: 5px;
  }
  .topline {
    height: 60px;
  }
  .arab {
    font-size: 30px;
  }
  .title {
    width: 100%;
    height: 100%;
  }
</style>