import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {successEventModal, modalInfoConfig} from "../../../shared/constant";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: "modal-add-edit",
    templateUrl: "modal-add-edit.component.html",
    styleUrls: ["modal-add-edit.component.css"]
})
export class ModalAddEditComponent implements OnInit {

    @Input() config: any;
    public maxSizeOfPictures: number = 1000000;
    public modalInfoConfig: any = modalInfoConfig;
    public successEventModal: any = successEventModal;
    public addEditForm: FormGroup;
    public isSamePasswords: boolean = true;

    constructor(private activeModal: NgbActiveModal,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.addEditForm = new FormGroup({
            "username": new FormControl("", Validators.required),
            "groupName": new FormControl("", [
                Validators.minLength(8)
            ]),
            "specialityCode": new FormControl("", [
                Validators.pattern("^[0-9]*$")
            ]),
            "entityName": new FormControl("", [
                Validators.pattern("^\d{4}-((0[1-9])|(1[012]))-((0[1-9]|[12]\d)|3[01])$")
            ]),
            "startDate": new FormControl("", [
                Validators.pattern("^[0-9]*$")
            ]),
            "endDate": new FormControl("", [
                Validators.pattern("^[0-9]*$")
            ]),
            "startTime": new FormControl("", [
                Validators.pattern("^(([0|1][0-9])|([2][0-3])):([0-5][0-9])$")
            ]),
            "endTime": new FormControl("", [
                Validators.pattern("^(([0|1][0-9])|([2][0-3])):([0-5][0-9])$")
            ]),
            "entityDescription": new FormControl("", [
                Validators.maxLength(100)
            ]),
            "email": new FormControl("", [
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            "password": new FormControl("", [
                Validators.minLength(8)
            ]),
            "cpassword": new FormControl("", [
                Validators.minLength(8)
            ]),
        });
    }

    comparePasswords() {
        if (this.addEditForm.controls["password"].value === this.addEditForm.controls["cpassword"].value) {
            return true;
        } else {
            return false;
        }
    }

    activateForm() {
        if (!this.addEditForm.controls["password"]) {
            this.activeModal.close(this.config);
        } else if (this.comparePasswords()) {
            this.activeModal.close(this.config);
        } else {
            this.isSamePasswords = false;
        }
    }

    openFile($event) {
        let input = $event.target;
        if (input.files[0].size > this.maxSizeOfPictures) {
            this.modalInfoConfig.infoString = "Перевищено максимальний розміо зображення";
            this.successEventModal();
        }
        let reader = new FileReader();
        reader.onload = () => {
            let dataURL = reader.result;
            this.config.img.value = dataURL;
        };
        reader.readAsDataURL(input.files[0]);
    }

    removeImage() {
        this.config.img.value = "";
    }

    // for datepicker
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }
    // the end of datapicker's code
}