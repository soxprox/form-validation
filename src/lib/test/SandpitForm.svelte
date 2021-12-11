<script>
  import { validate } from '../index.js';
  let name;
</script>
<h1>Sandpit Test Form</h1>

<div>
  <label for="name">Name</label>
  <input type="text" id="name" bind:value={name}>
  {name}
</div>