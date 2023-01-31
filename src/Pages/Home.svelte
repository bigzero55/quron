<script>
  //@ts-nocheck
  import { Card, ProgressCircular} from 'svelte-materialify'
  import quran from '../assets/al-quran-kaligrafi-png.png'
  import TitleSurat from '../Components/TitleSurat.svelte';
  import { onMount } from 'svelte';
  import { Surahs } from '../lib/store'

  onMount(async()=> {
    try {
      const getdata = await fetch('https://api.quran.gading.dev/surah/')
      const Surah = await getdata.json()
      Surahs.set(Surah.data)
    } catch {
      console.log('error')
    }

  })

$: if ($Surahs.length) {
  console.log('ada data')
} else {
  console.log('error coy')
}
</script>

{#if $Surahs.length}
  <div class="pl-5 pr-5 white fixed-top pt-5 elevation-5">
    <Card class="text-center pt-4 pb-4 green">
      <img src={quran} alt="alquran" width="250px" class="">
    </Card>
    <div class="green divider mt-5 mb-5"></div>
      {#if !$Surahs.length}
        <div class="d-flex justify-center align-center">
          <ProgressCircular size={70} width={7} indeterminate color="success" />
        </div>
      {/if}
  </div>

  <div class="aku">
    <div class="ma-2 tit pb-8">
        {#each $Surahs as surat }
          <TitleSurat 
            nama={surat.name.transliteration.id}
            arti={surat.name.translation.id}
            arab={surat.name.short}
            num={surat.number}
          />
        {/each}
    </div>
  </div>
{:else}
  <div class="oj d-flex justify-center align-center">
    <ProgressCircular size={70} width={7} indeterminate color="success" />
  </div>
{/if}

<style>
  .oj {
    height: 100vh;
  }
  .fixed-top {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
  }

  .aku {
    margin-top: 210px;
    background-color: white;
  }

  .divider {
    height: 4px;
    border-radius: 5px;
  }

</style>

