import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ENV_VAR } from '../common/form-contants';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-dsar-form',
  templateUrl: './dsar-form.component.html',
  styleUrl: './dsar-form.component.scss',
})
export class DsarFormComponent implements AfterViewInit {
  form: FormGroup;
  loading = false;
  showSubmitButton = true;

  countries = [
    'United States',
    'Mexico',
    'Canada',
    'United Kingdom',
    'India',
    'Other',
  ];

  relationshipWithRevature = [
    'Associate or Software Engineer',
    'Subscriber or On Mailing List',
    'Other',
  ];

  relationshipToDataSubject = ['Attorney', 'Third-Party Service', 'Other'];

  requestTypes = [
    'Consent withdrawal',
    'Access request',
    'Rectification of personal data',
    'Erasure of personal data',
    'Restriction of processing of personal data',
    'Personal data portability request',
    'Objection to the processing of personal data',
  ];

  showOtherRelationshipField = false;
  showBehalfFields = false;
  showRelationshipDetails = false;
  relationshipDetailsLabel = '';
  relationshipDetailsHelpText = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      // Data Subject Details
      legalFirstName: ['', [Validators.required]],
      legalLastName: ['', [Validators.required]],
      otherNames: ['', [Validators.required]],
      streetAddress: [''],
      city: [''],
      state: ['', [Validators.required]],
      postCode: [''],
      country: ['', [Validators.required]],
      email: ['', [Validators.required, this.validateEmail]],
      phone: ['', [Validators.required, this.validatePhone.bind(this)]],
      relationshipWithRevature: ['', [Validators.required]],
      relationshipWithRevatureOther: [''],

      // On behalf fields
      isRequestingOnBehalf: [false],

      // Data Subject Details when requesting on behalf
      onBehalfFirstName: [''],
      onBehalfLastName: [''],
      onBehalfStreetAddress: [''],
      onBehalfCity: [''],
      onBehalfState: [''],
      onBehalfPostCode: [''],
      onBehalfCountry: [''],
      onBehalfEmail: [''],
      onBehalfPhone: [''],
      relationshipToDataSubject: [''],
      relationshipToDataSubjectDetails: [''],

      // Request details
      requestType: ['', [Validators.required]],
      requestDetails: [''],
      requestReason: [''],

      // Declaration
      fullName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      iConsent: [false, [Validators.requiredTrue]],
      anotherindividua3: [''],
      anotherindividual4: [''],

      // reCAPTCHA
      validCaptacha: [''],
    });

    // Add dynamic field handling
    this.form.get('phone')?.valueChanges.subscribe((value) => {
      this.formatPhoneNumber(value);
    });

    this.form.get('onBehalfPhone')?.valueChanges.subscribe((value) => {
      this.formatOnBehalfPhoneNumber(value);
    });

    this.form
      .get('relationshipWithRevature')
      ?.valueChanges.subscribe((value) => {
        this.handleRelationshipWithRevatureChange(value);
      });

    this.form.get('isRequestingOnBehalf')?.valueChanges.subscribe((value) => {
      this.handleOnBehalfChange(value);
    });

    this.form
      .get('relationshipToDataSubject')
      ?.valueChanges.subscribe((value) => {
        this.handleRelationshipToDataSubjectChange(value);
      });
  }

  private handleRelationshipWithRevatureChange(value: string): void {
    this.showOtherRelationshipField = value === 'Other';

    if (this.showOtherRelationshipField) {
      this.form
        .get('relationshipWithRevatureOther')
        ?.setValidators([Validators.required]);
    } else {
      this.form.get('relationshipWithRevatureOther')?.clearValidators();
      this.form.get('relationshipWithRevatureOther')?.setValue('');
    }
    this.form.get('relationshipWithRevatureOther')?.updateValueAndValidity();
  }

  private handleOnBehalfChange(value: boolean): void {
    this.showBehalfFields = value;

    const behalfControls = [
      'onBehalfFirstName',
      'onBehalfLastName',
      'onBehalfState',
      'onBehalfCountry',
      'onBehalfEmail',
      'onBehalfPhone',
    ];

    if (this.showBehalfFields) {
      behalfControls.forEach((control) => {
        this.form.get(control)?.setValidators([Validators.required]);
        this.form.get(control)?.updateValueAndValidity();
      });
    } else {
      behalfControls.forEach((control) => {
        this.form.get(control)?.clearValidators();
        this.form.get(control)?.setValue('');
        this.form.get(control)?.updateValueAndValidity();
      });

      // Reset relationship fields
      this.form.get('relationshipToDataSubject')?.setValue('');
      this.form.get('relationshipToDataSubjectDetails')?.setValue('');
      this.showRelationshipDetails = false;
    }
  }

  private handleRelationshipToDataSubjectChange(value: string): void {
    this.showRelationshipDetails =
      value === 'Third-Party Service' || value === 'Other';

    if (value === 'Third-Party Service') {
      this.relationshipDetailsLabel = 'Company Name*';
      this.relationshipDetailsHelpText = 'Please enter Company name.';
      this.form
        .get('relationshipToDataSubjectDetails')
        ?.setValidators([Validators.required]);
    } else if (value === 'Other') {
      this.relationshipDetailsLabel = 'Please specify*';
      this.relationshipDetailsHelpText = 'Please enter specify name.';
      this.form
        .get('relationshipToDataSubjectDetails')
        ?.setValidators([Validators.required]);
    } else {
      this.form.get('relationshipToDataSubjectDetails')?.clearValidators();
      this.form.get('relationshipToDataSubjectDetails')?.setValue('');
    }

    this.form.get('relationshipToDataSubjectDetails')?.updateValueAndValidity();
  }

  private validateEmail(control: any): { [key: string]: boolean } | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/;
    return emailPattern.test(control.value) ? null : { invalidEmail: true };
  }

  private validatePhone(control: any): { [key: string]: boolean } | null {
    const phone = control.value?.replace(/\D/g, '');
    if (!phone) {
      return null;
    }
    const phoneRegExp = /^\d{6,14}$/;
    return phoneRegExp.test(phone) ? null : { invalidPhone: true };
  }

  private formatPhoneNumber(phone: string): void {
    const phoneControl = this.form.get('phone');
    if (!phoneControl) return;

    let formattedPhone = phone.replace(/\D/g, '');
    phoneControl.setValue(formattedPhone, { emitEvent: false });
  }

  private formatOnBehalfPhoneNumber(phone: string): void {
    const phoneControl = this.form.get('onBehalfPhone');
    if (!phoneControl) return;

    let formattedPhone = phone.replace(/\D/g, '');
    phoneControl.setValue(formattedPhone, { emitEvent: false });
  }

  recaptchaSuccessCallback(response: any): void {
    this.form.get('validCaptacha')?.setValue(response ? true : false);
  }

  async onSubmit(): Promise<void> {
    if (this.sharedService.hasSuspiciousContent(this.form.value)) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (!this.form.get('validCaptacha')?.value) {
        this.form.get('validCaptacha')?.setValue(false);
      }
      return;
    }

    if (!this.form.get('validCaptacha')?.value) {
      this.form.get('validCaptacha')?.setValue(false);
      return;
    }

    this.loading = true;
    this.showSubmitButton = false;
    const formData = this.prepareFormData();
    await this.submitForm(formData);
  }

  private prepareFormData(): any {
    let formDataObject = { ...this.form.value };
    let SFDataObject: any = {};
    // Map form fields to Salesforce fields
    const salesforceMapping = {
      legalFirstName: '00N3g000000YxE7',
      legalLastName: '00N3g000000YxE8',
      otherNames: '00N7A000008eY11',
      streetAddress: '00N3g000000YxEM',
      city: '00N3g000000YxDz',
      state: '00N3g000000YxEK',
      postCode: '00N3g000000YxEP',
      country: '00N3g000000YxE2',
      email: '00N0d0000031Q43',
      phone: '00N3g000000YxE9',
      relationshipWithRevature: '00N3g000000YxEF',
      relationshipWithRevatureOther: '00N3g000000YxEEEA0',
      onBehalfFirstName: '00N3g000000YxE5',
      onBehalfLastName: '00N3g000000YxE6',
      onBehalfStreetAddress: '00N3g000000YxEL',
      onBehalfCity: '00N3g000000YxDy',
      onBehalfState: '00N3g000000YxEJ',
      onBehalfPostCode: '00N3g000000YxEO',
      onBehalfCountry: '00N3g000000YxE1',
      onBehalfEmail: 'EmailOther__c',
      onBehalfPhone: '00N3g000000YxEB',
      relationshipToDataSubject: '00N3g000000YxED',
      relationshipToDataSubjectDetails: '00N3g000000YxECEA0',
      requestType: '00N3g000000YxEN',
      requestDetails: '00N3g000000YxEGEA0',
      requestReason: '00N3g000000YxEIEA0',
      iConsent: '00N3g000000YxE0',
      date: 'date',
      fullName: 'fullname',
      anotherindividua3: 'anotherindividua3',
      anotherindividual4: 'anotherindividual4',
    };

    // Add Salesforce field mappings to form data
    for (const [formField, sfField] of Object.entries(salesforceMapping)) {
      SFDataObject[sfField] = formDataObject[formField];
    }

    // Handle checkbox values for Salesforce
    if (formDataObject.isRequestingOnBehalf) {
      SFDataObject['00N3g000000YxEH'] = '1';
    } else {
      SFDataObject['anotherindividual2'] = 'no';
    }

    // Fix for anotherindividua3 checkbox value
    SFDataObject['anotherindividua3'] = formDataObject.anotherindividua3
      ? 'yes'
      : '';
    SFDataObject['anotherindividual4'] = formDataObject.anotherindividual4
      ? 'no'
      : '';
    SFDataObject['00N3g000000YxE0'] = formDataObject.iConsent ? '1' : '0';

    return SFDataObject;
  }
  async submitForm(formDataObject: any): Promise<void> {
    const apiUrl =
      'https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8';

    try {
      // Create a hidden form element and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = apiUrl;

      // Add required Salesforce fields
      this.appendFormField(form, 'orgid', '00D0P000000Da8T');
      this.appendFormField(form, 'retURL', ENV_VAR.URL + '/thank-you/dsar');
      this.appendFormField(form, 'recordType', '0123g0000001swX');
      this.appendFormField(form, 'external', '1');

      // Add mapped form fields
      for (const [key, value] of Object.entries(formDataObject)) {
        if (value !== undefined && value !== null) {
          this.appendFormField(form, key, String(value));
        }
      }

      // Append form to body and submit
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Error submitting form data. Please try again.');
    } finally {
      this.loading = false;
      this.showSubmitButton = true;
    }
  }

  private appendFormField(
    form: HTMLFormElement,
    name: string,
    value: string
  ): void {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  navigateToThankYouPage(firstName: string): void {
    window.location.href = `/thank-you?name=${btoa(firstName)}`;
  }

  getQueryParams(): any {
    return new URLSearchParams(window.location.search);
  }

  standardizeQueryParams(queryParams: any): any {
    const standardizedQueryParams: any = {};

    // Convert all keys to lowercase for case-insensitive lookup
    for (const [key, value] of queryParams.entries()) {
      const lowerKey = key.toLowerCase();
      standardizedQueryParams[lowerKey] = value;
    }

    return standardizedQueryParams;
  }

  createQueryString(data: any): string {
    return Object.keys(data)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(data[key] || '')}`
      )
      .join('&');
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCaptcha();
  }

  ngAfterViewInit() {
    this.resizeCaptcha();
  }

  private resizeCaptcha(): void {
    const width = window.innerWidth;
    const recaptchaContainer = document.querySelector('.g-recaptcha');

    if (recaptchaContainer) {
      if (width < 400) {
        const scale = width / 400;
        const transformOrigin = 'left top';
        (recaptchaContainer as HTMLElement).style.transform = `scale(${scale})`;
        (recaptchaContainer as HTMLElement).style.transformOrigin =
          transformOrigin;
      } else {
        (recaptchaContainer as HTMLElement).style.transform = 'scale(1)';
      }
    }
  }
}
