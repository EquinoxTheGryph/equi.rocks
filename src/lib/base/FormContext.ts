export interface FormItem {
    id: string
    name: string
}

export default class FormContext {
	test: string;
	formItems: FormItem[];

	constructor() {
		this.test = 'hello';
		this.formItems = [];
	}

    register(value: FormItem) {
        this.formItems.push(value)
        return this
    }
}
