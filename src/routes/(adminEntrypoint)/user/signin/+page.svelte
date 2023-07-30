<script lang="ts">
    import {
        Button,
        Column,
        Content,
        FluidForm,
        Form,
        Grid,
        Header,
        PasswordInput,
        Row,
        SkipToContent,
        TextInput,
        ToastNotification,
    } from 'carbon-components-svelte';
    import { page } from '$app/stores';
    import { signIn } from '@auth/sveltekit/client';
    import type { signinErrors } from '$lib/base/Util.js';

    export let data;

    const error = $page.url.searchParams.get('error')?.toLowerCase() as
        | keyof typeof signinErrors
        | null;

    let username = '';
    let password = '';
    let token = '';

    function submit() {
        signIn("credentials", {username, password, token})
    }
</script>

<Header platformName="equi.rocks">
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
    <!-- <HeaderNav>
      <HeaderNavItem href="/" text="Link 1" />
      <HeaderNavItem href="/" text="Link 2" />
      <HeaderNavItem href="/" text="Link 3" />
      <HeaderNavMenu text="Menu">
        <HeaderNavItem href="/" text="Link 1" />
        <HeaderNavItem href="/" text="Link 2" />
        <HeaderNavItem href="/" text="Link 3" />
      </HeaderNavMenu>
    </HeaderNav> -->
</Header>

<Content>
    <Grid>
        <Row>
            <Column />
            <Column lg={8}>
                <h1>Log in</h1>
                <br />
                <FluidForm on:submit={submit}>
                    <TextInput
                        labelText="User name"
                        placeholder="Enter user name..."
                        required
                        bind:value={username}
                    />
                    <PasswordInput
                        type="password"
                        labelText="Password"
                        placeholder="Enter password..."
                        bind:value={password}
                    />
                    <PasswordInput
                        type="password"
                        labelText="Token"
                        placeholder="Enter token..."
                        bind:value={token}
                    />
                    <Button type="submit">Submit</Button>
                </FluidForm>
            </Column>
            <Column />
        </Row>
    </Grid>
</Content>

{#if error}
     <ToastNotification
       title="Error"
       subtitle={error}
     />
{/if}