<script lang="ts">
    import ComboBoxCustom from '$components/carbon/ComboBoxCustom.svelte';
    import MarkdownEditorCarbon from '$components/carbon/MarkdownEditorCarbon.svelte';
    import { mdiCog } from '@mdi/js';
    import {
        Content,
        Grid,
        Row,
        Column,
        ImageLoader,
        DatePicker,
        DatePickerInput,
        TextInput,
        FileUploaderItem,
        FileUploader,
        ComboBox,
        Tag,
        ButtonSet,
        TextArea,
        ContentSwitcher,
        Switch,
        Tabs,
        Tab,
        TabContent
    } from 'carbon-components-svelte';
    import {
        Form,
        FormGroup,
        Checkbox,
        RadioButtonGroup,
        RadioButton,
        Select,
        SelectItem,
        Button
    } from 'carbon-components-svelte';
    import Icon from 'mdi-svelte';

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
</script>

<Grid>
    <Row>
        <h1 style="margin-bottom: 0.5em;">Manage Post</h1>
    </Row>
    <Row>
        <Column lg={6}>
            <Form on:submit>
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
                    <RadioButtonGroup name="visibility" selected="private">
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
                    <RadioButtonGroup name="rating" selected="unrated">
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
                            selectedId="2"
                            on:newItem={(e) => console.log(e.detail)}
                            on:select={(e) => console.log(e.detail)}
                        />
                        <Button size="field" kind="ghost">
                            <Icon path={mdiCog} color="#f4f4f4" title="Manage Groups" />
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
                        <Button size="field" kind="ghost">
                            <Icon path={mdiCog} color="#f4f4f4" title="Manage Tags" />
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
                    <DatePicker name="createdOn" datePickerType="single">
                        <DatePickerInput placeholder="mm/dd/yyyy" />
                    </DatePicker>
                </FormGroup>

                <FormGroup legendText="Source (Optional)">
                    <TextInput
                        name="source"
                        placeholder="https://gallery.example.org/post/abc123"
                    />
                </FormGroup>
            </Form>
        </Column>
        <Column lg={10}>
            <Form on:submit>
                <FormGroup legendText="Title">
                    <TextInput name="name" placeholder="Title Text" />
                </FormGroup>
                <FormGroup legendText="Alt Text (Optional)">
                    <TextArea
                        name="altText"
                        placeholder="A description about the given media for screenreaders"
                        rows={2}
                    />
                </FormGroup>
                <FormGroup legendText="Description (Supports markdown, Optional)">
                    <MarkdownEditorCarbon />
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
</style>
