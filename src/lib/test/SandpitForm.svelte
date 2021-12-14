<script>
  import { validate } from '../index.js';
  let name='';
  let email='';
  let errors = {
    name: [],
    email: [],
  }

  const dataRules = {
      name: {
        rules: [
          {
            validate: 'minLength|3',
            message: 'Name must be at least 3 characters'
          }
        ]
      },
      email: {
        rules: [
          {
            validate: 'email',
            message: 'Email should be valid'
          }
        ]
      }
    };

  let onKeyUp = async () => {
    errors = await validate({ email }, dataRules);
  }

  let onClick = async () => {
    errors = await validate({ email, name }, dataRules);
  }
</script>
<h1>Sandpit Test Form</h1>

<div>
  <label for="name">Name</label>
  <input type="text" id="name" bind:value={name}>
  {#if errors.name}
  {#each errors.name as error}
    <div>{error}</div>
  {/each}
  {/if}
</div>
<div>
  <label for="email">Email</label>
  <input type="text" id="email" on:keyup={onKeyUp} bind:value={email}>
  {#if errors.email}
  {#each errors.email as error}
    <div>{error}</div>
  {/each}
  {/if}
</div>
<div>
  <button on:click={onClick}>Submit</button>
</div>