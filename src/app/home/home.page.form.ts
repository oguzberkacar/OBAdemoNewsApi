import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

export class HomePageForm{
    private formBuilder: UntypedFormBuilder;

    constructor(formBuilder: UntypedFormBuilder){
        this.formBuilder = formBuilder;
    }

    createForm() :UntypedFormGroup{
        return this.formBuilder.group({
            name:['',[Validators.required]]
        });
    }
}