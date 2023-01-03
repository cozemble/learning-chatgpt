<script lang="ts">
  import type { TimestampedMessage } from "./messages";
  import { afterUpdate } from "svelte";
  import { enhance } from "$app/forms";

  export let form: any;

  let messages: TimestampedMessage[] = [];

  afterUpdate(() => {
    if (form?.timestamp) {
      const maybeExisting = messages.find(m => m.timestamp === form.timestamp);
      if (!maybeExisting) {
        asking = false
        messages = [...messages, form];
      }
    }
  });

  let asking = false;

  function asked() {
    asking = true;
  }
</script>

{#each messages as message}
  {@html message.message}
  <hr />
{/each}
{#if asking}
  <p>Asking ChatCPT...</p>
{/if}
<form method="POST" action="?/chat" use:enhance>
  <label for="question">What would you like to know about cozemble?</label>
  <input type="text" name="question" id="question" />
  <button type="submit" on:click={asked}>Ask</button>
</form>