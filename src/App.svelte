<script>
  //@ts-nocheck
  import {Router, Route} from 'svelte-navigator'
  import Home from './Pages/Home.svelte';
  import Surat from './Pages/Surat.svelte'
  import {MaterialApp} from 'svelte-materialify'
</script>

<MaterialApp>
  <Router>
    <Route path="/">
      <Home />
    </Route>
    <Route path="surah">
      <Surat />
    </Route>
Route path="surah">
      <Surat />
    </Route>
  </Router>
</MaterialApp>

