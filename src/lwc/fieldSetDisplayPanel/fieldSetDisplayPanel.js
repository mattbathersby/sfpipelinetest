import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import getFieldNames from '@salesforce/apex/FieldSetDisplayPanelController.getFieldNames';

export default class FieldSetDisplayPanel extends LightningElement {

    @api recordId;
    @api objectApiName;
    @api fieldSetApiName;
    @api columns;
    @api panelLabel;
    @api collapsible;
    @api fieldNames;
    @api error;

    isLoading;
    hasError;
    columnClass;

    constructor(){
        super();
        this.isLoading = true;
        this.hasError = false;
    }

    connectedCallback(){
        this.columnClass = 'slds-size_1-of-' + this.columns;
    }

    @wire(getFieldNames, {fieldSetApiName: '$fieldSetApiName', sObjectName: '$objectApiName'})
    wiredFieldNames({ error, data }) {
        if (data) {
            this.fieldNames = data;
            this.error = undefined;
            this.isLoading = false;
        } else if (error) {
            console.log(error);
            this.error = error;
            this.fieldNames = undefined;
            this.hasError = true;
            this.isLoading = false;
        }
    }

    toggleSection(event){
        let section = this.template.querySelector('.slds-section');
        section.classList.toggle('slds-is-open');
    }

}