<script>
    import {
        Header,
        HeaderNav,
        HeaderNavItem,
        HeaderNavMenu,
        SideNav,
        SideNavItems,
        SideNavMenu,
        SideNavMenuItem,
        SideNavLink,
        SideNavDivider,
        SkipToContent,
        Content,
        Grid,
        Row,
        Column
    } from 'carbon-components-svelte';

    let isSideNavOpen = false;
</script>

<svelte:head>
    <!-- Include Carbon Styles -->
    <link rel="stylesheet" href="/node_modules/carbon-components-svelte/css/g90.css" />
</svelte:head>

<Header platformName="equi.rocks" bind:isSideNavOpen href="/">
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
    <HeaderNav>
        <HeaderNavItem href="/user/signout" text="Log Out" />
        <HeaderNavItem href="/manager" text="Gallery Manager" />
        <HeaderNavMenu text="Configuration">
            <HeaderNavItem href="/configuration" text="Main" />
            <HeaderNavItem href="/configuration/links" text="Link Management" />
        </HeaderNavMenu>
    </HeaderNav>
</Header>

<!-- <SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <SideNavLink text="Link 1" />
        <SideNavLink text="Link 2" />
        <SideNavLink text="Link 3" />
        <SideNavMenu text="Menu">
            <SideNavMenuItem href="#" text="Link 1" />
            <SideNavMenuItem href="#" text="Link 2" />
            <SideNavMenuItem href="#" text="Link 3" />
        </SideNavMenu>
        <SideNavDivider />
        <SideNavLink text="Link 4" />
    </SideNavItems>
</SideNav> -->

<Content>
    <slot />
</Content>
