<script>
  import { validate } from '../index.js';
  let name;
  let errors = {
    name: []
  }
  let onClick = async () => {
    const dataRules = {
      name: {
        rules: [
          {
            validate: 'minLength|3',
            message: 'Name must be at least 3 characters'
          }
        ]
      }
    };
    errors = await validate({ name }, dataRules);
  }
</script>
<h1>Sandpit Test Form</h1>

<div>
  <label for="name">Name</label>
  <input type="text" id="name" bind:value={name}>
  {#each errors.name as error}
    <div>{error}</div>
  {/each}
</div>
<div>
  <button on:click={onClick}>Submit</button>
</div>