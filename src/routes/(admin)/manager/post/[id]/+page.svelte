<script lang="ts">
    import { page } from '$app/stores';
    import ComboBoxCustom from '$components/carbon/ComboBoxCustom.svelte';
    import MarkdownEditorCarbon from '$components/carbon/MarkdownEditorCarbon.svelte';
    import { mdiArrowLeft, mdiCog, mdiFloppy } from '@mdi/js';
    import type { Post } from '@prisma/client';
    import {
        Button,
        Column,
        DatePicker,
        DatePickerInput,
        FileUploader,
        Form,
        FormGroup,
        Grid,
        ImageLoader,
        RadioButton,
        RadioButtonGroup,
        Row,
        Tag,
        TextArea,
        TextInput
    } from 'carbon-components-svelte';
    import Icon from 'mdi-svelte';

    export let data;

    const isNew = $page.params.id === 'new';

    let groupItems = [
        { id: '0', text: 'Slack' },
        { id: '1', text: 'Email' },
        { id: '2', text: 'Fax' }
    ];
    let availableTags = [
        { id: '0', text: 'Hello' },
        { id: '1', text: 'World' },
        { id: '2', text: 'Cool' },
        { id: '3', text: 'Stuff' }
    ];
    let selectedTags = [
        { id: '0', text: 'Hello' },
        { id: '1', text: 'World' }
    ];

    let value: Post = {
        id: '',
        name: 'Unnamed',
        description: '',
        altText: '',
        visibility: 'private',
        rating: 'unrated',
        groupName: null,
        mimeType: '',
        extension: '',
        metadata: {
            source: 'It was a vision in my dreams'
        },
        createdOn: new Date(),
        publishedOn: new Date(),
        modifiedOn: new Date()
    };

    async function saveChanges() {
        console.log(value);
    }
</script>

<Grid>
    <Row>
        <div class="header">
            <Button
                size="field"
                kind="ghost"
                class="iconButton"
                on:click={() => window.history.back()}
            >
                <Icon path={mdiArrowLeft} title="Go Back" />
            </Button>
            <h1>
                {#if isNew}
                    New
                {:else}
                    Manage
                {/if} Post
            </h1>
            <div class="spacer" />
            <Button size="field" kind="tertiary" class="iconButton" on:click={saveChanges}>
                <p>Save Changes</p>
                <Icon path={mdiFloppy} title="Save Changes" />
            </Button>
        </div>
    </Row>
    <Row>
        <Column lg={6}>
            <Form on:submit={(e) => e.preventDefault()}>
                <FormGroup legendText="File">
                    <ImageLoader src="https://picsum.photos/id/1/1000/1000" fadeIn />
                    <FileUploader buttonLabel="Add File" status="edit" />
                </FormGroup>
                <FormGroup legendText="Thumbnail/Preview (Optional)">
                    <ImageLoader src="https://picsum.photos/id/1/1000/1000" fadeIn />
                    <FileUploader
                        buttonLabel="Add Image"
                        accept={['.jpg', '.jpeg', '.png', '.webp']}
                        status="edit"
                    />
                </FormGroup>
                <FormGroup legendText="Visibility">
                    <RadioButtonGroup bind:selected={value.visibility}>
                        <RadioButton
                            id="visibility-public"
                            value="public"
                            labelText="Public"
                            title="Visible to anyone"
                        />
                        <RadioButton
                            id="visibility-hidden"
                            value="hidden"
                            labelText="Hidden"
                            title="Only visible to those who visit the post by URL"
                        />
                        <RadioButton
                            id="visibility-private"
                            value="private"
                            labelText="Private"
                            title="Only visible to the owner"
                        />
                    </RadioButtonGroup>
                </FormGroup>

                <FormGroup legendText="Rating">
                    <RadioButtonGroup bind:selected={value.rating}>
                        <RadioButton
                            id="rating-general"
                            value="general"
                            labelText="General"
                            title="Safe For Work (SFW)"
                        />
                        <RadioButton
                            id="rating-mature"
                            value="mature"
                            labelText="Mature"
                            title="Adult-oriented content"
                        />
                        <RadioButton
                            id="rating-explicit"
                            value="explicit"
                            labelText="Explicit"
                            title="Not Safe For Work (NSFW)"
                        />
                        <RadioButton
                            id="rating-unrated"
                            value="unrated"
                            labelText="Unrated"
                            title="No rating applied"
                        />
                    </RadioButtonGroup>
                </FormGroup>

                <FormGroup legendText="Group (Optional)">
                    <div class="inline">
                        <ComboBoxCustom
                            placeholder="Select Group"
                            items={groupItems}
                            bind:selectedId={value.groupName}
                            on:newItem={(e) => console.log(e.detail)}
                            on:select={(e) => console.log(e.detail)}
                        />
                        <Button size="field" kind="ghost" class="iconButton">
                            <Icon path={mdiCog} title="Manage Groups" />
                        </Button>
                    </div>
                </FormGroup>

                <FormGroup legendText="Tags (Optional)">
                    <div class="inline">
                        <ComboBoxCustom
                            placeholder="Add Tag"
                            items={availableTags}
                            clearOnSelect
                            on:newItem={(e) => console.log(e.detail)}
                            on:select={(e) => {
                                console.log(e.detail);
                                if (!selectedTags.find((item) => item.id == e.detail.id))
                                    selectedTags = [...selectedTags, e.detail];
                            }}
                        />
                        <Button size="field" kind="ghost" class="iconButton">
                            <Icon path={mdiCog} title="Manage Tags" />
                        </Button>
                    </div>

                    {#if selectedTags?.length}
                        <br />
                    {/if}
                    {#each selectedTags as tag}
                        <Tag
                            filter
                            interactive
                            on:close={() => {
                                selectedTags = selectedTags.filter((item) => item != tag);
                            }}
                            on:click={() => {
                                console.log('edit', tag);
                            }}
                        >
                            {tag.text}
                        </Tag>
                    {/each}
                </FormGroup>

                <FormGroup legendText="Created On (Custom, Optional)">
                    <DatePicker bind:value={value.createdOn} datePickerType="single">
                        <DatePickerInput placeholder="mm/dd/yyyy" />
                    </DatePicker>
                </FormGroup>

                <FormGroup legendText="Source (Optional)">
                    <TextInput
                        bind:value={value.metadata.source}
                        placeholder="https://gallery.example.org/post/abc123"
                    />
                </FormGroup>
            </Form>
        </Column>
        <Column lg={10}>
            <Form on:submit={(e) => e.preventDefault()}>
                <FormGroup legendText="Title">
                    <TextInput bind:value={value.name} placeholder="Title Text" size="xl" />
                </FormGroup>
                <FormGroup legendText="Alt Text (Optional)">
                    <TextArea
                        bind:value={value.altText}
                        placeholder="A description about the given media for screenreaders"
                        rows={2}
                    />
                </FormGroup>
                <FormGroup legendText="Description (Supports markdown, Optional)">
                    <MarkdownEditorCarbon bind:value={value.description} />
                </FormGroup>
            </Form>
        </Column>
    </Row>
</Grid>

<style lang="scss">
    :global(.bx--list-box__menu-item, .bx--list-box__menu-item__option) {
        height: auto;
    }

    .inline {
        display: flex;
        :global(.bx--list-box__wrapper) {
            width: 100%;
        }
    }

    :global(.iconButton) {
        // This will remove the weird right padding 
        // (15px is hardcoded in the style)
        padding-right: 15px;

        p {
            margin-right: 15px;
        }
    }

    :global(.iconButton.bx--btn--ghost) {
        color: #f4f4f4 !important;
    }

    .header {
        display: flex;
        gap: 0.5em;
        margin-bottom: 2em;
        width: 100%;

        .spacer {
            flex-grow: 1;
        }
    }
</style>
