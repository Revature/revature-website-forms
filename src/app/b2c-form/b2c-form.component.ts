import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENV_VAR, MAJORS, US_SCHOOLS, MEXICO_STATE_VALUES, MEXICO_SCHOOLS } from '../common/form-contants';

declare const Dropbox: any;

@Component({
  selector: 'app-b2c-form',
  templateUrl: './b2c-form.component.html',
  styleUrl: './b2c-form.component.scss'
})

export class B2cFormComponent {
  form: FormGroup;

  graduationYears: number[] = [];
  showSponsorshipFields: boolean = false;
  showFutureSponsorshipFields: boolean = false;

  fileError: string = '';
  fileSuccess: string = '';
  loading = false;
  showSubmitButton = true;
  dropboxReady = false;

  filteredMajors: any[] = [];
  filteredSchools: any[] = [];
  formAuditValue = {
    school: {
      label: '',
      value: ''
    },
    major: {
      label: '',
      value: ''
    }
  }
  focusedControl: any = {
    school: false,
    major: false
  }
  schools = US_SCHOOLS;

  states = MEXICO_STATE_VALUES;

  branches = [
    { value: "a0A0d00000cwoOcEAI", label: "Computer Science and Engineering" },
    { value: "a0A3g000000sYkcEAE", label: "Electronics and Communication Engineering" },
    { value: "a0A0P00001ZJyDgUAL", label: "Circuital" },
    { value: "a0A0P00001ZJyDjUAL", label: "Information Technology" },
    { value: "a0A0P00001ZJyDHUA1", label: "Civil Engineering" },
    { value: "a0A0P00001ZJyDqUAL", label: "Mechanical Engineering" },
    { value: "a0A0P00001ZJyCLUA1", label: "Unlisted" }
  ]

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.initForm();
    this.initDropbox();
  }

  private initForm(): void {
    this.form = this.fb.group({
      // Full Name
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],

      // Contact Information
      email: ['', [Validators.required, this.validateEmail]], // Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]+$')
      phone: ['', [Validators.required, this.validatePhone]],

      // Country
      country: ['', [Validators.required]],

      // Location Fields (Dynamic based on country selection)
      city: [''],
      state: [''],
      zip: ['', [Validators.pattern('^[0-9]{5}$')]], // US ZIP
      canadaState: [''],
      canadaZip: ['', [Validators.pattern('^[a-zA-Z0-9]{6}$')]], // Canada ZIP
      ukZip: ['', [Validators.pattern('^[a-zA-Z0-9]{7}$')]], // UK ZIP

      // Current Student
      currentStudent: ['', [Validators.required]],

      // Education Fields (Dynamic based on country and current student selection)
      levelOfEducation: ['', [Validators.required]],
      branch: [''],
      major: [''],
      majorID: [''],
      school: [''],
      schoolID: [''],
      graduationMonth: [''],
      graduationYear: [''],

      // Willingness to Relocate
      willingToRelocate: ['', [Validators.required]],

      // Programming Experience
      programmingExperience: [''],

      // Work Authorization
      workAuthorization: ['', [Validators.required]],
      sponsorship: [''],
      futureSponsorship: [''],

      // Resume Upload
      resumeURL: [''],
      computer_data: [''],
      computer_data_result: [''],
      FileBase64: [''],
      FileExt: [''],
      dropbox: [''],
      Resumedropbox: [''],

      // Privacy Consent
      dataConsent: [false],

      // reCAPTCHA
      validCaptacha: [''],

      // India-Specific Fields
      majorGrade: ['', [Validators.pattern('^[0-9]{1,2}$')]], // Score in Degree (in %)
      twelfthGrade: ['', [Validators.pattern('^[0-9]{1,2}$')]], // Score in 12th Board exam (in %)
      tenthGrade: ['', [Validators.pattern('^[0-9]{1,2}$')]], // Score in 10th Board exam (in %)
    });

    this.form.get('phone')?.valueChanges.subscribe((value) => {
      this.formatPhoneNumber(value);
    });

    // Dynamic Validations Based on Country Selection
    this.form.get('country')?.valueChanges.subscribe((country) => {
      this.handleCountryChange(country);
    });

    // Dynamic Validations Based on Current Student Selection
    this.form.get('currentStudent')?.valueChanges.subscribe((currentStudent) => {
      this.handleCurrentStudentChange(currentStudent);
    });

    this.form.get('branch')?.valueChanges.subscribe((selectedValue) => {
      this.onBranchChange(selectedValue);
    });

    // Dynamic Validations Based on Work Authorization Selection
    this.form.get('workAuthorization')?.valueChanges.subscribe((workAuthorization) => {
      this.handleWorkAuthorizationChange(workAuthorization);
    });

    // Add dynamic validators for future sponsorship fields
    this.form.get('sponsorship')?.valueChanges.subscribe((value) => {
      this.handleSponsorshipChange(value);
    });
  }

  private initDropbox(): void {
    const script = document.createElement('script');
    script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
    script.id = 'dropboxjs';
    script.dataset['appKey'] = 'lcc592yiomt2omy';
    script.addEventListener('load', () => {
      this.dropboxReady = true;
    });
    document.body.appendChild(script);
  }

  private validatePhone(control: any): { [key: string]: boolean } | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    const phone = control.value.replace(/\D/g, '');
    const phoneRegExp = /^\d{10}$/;

    if (phone[0] === '1' || !phoneRegExp.test(phone)) {
      return { invalidPhone: true };
    }
    return null;
  }

  private validateEmail(control: any): { [key: string]: boolean } | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(control.value) ? null : { invalidEmail: true };
  };

  private formatPhoneNumber(phone: string): void {
    const phoneControl = this.form.get('phone');
    if (!phoneControl) return;

    let formattedPhone = phone.replace(/\D/g, '');

    if (formattedPhone.length === 10) {
      formattedPhone = formattedPhone.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
    } else if (formattedPhone.length > 6) {
      formattedPhone = formattedPhone.replace(/^(\d{3})(\d{3})(\d*)$/, "($1) $2-$3");
    } else if (formattedPhone.length > 3) {
      formattedPhone = formattedPhone.replace(/^(\d{3})(\d*)$/, "($1) $2");
    } else if (formattedPhone.length > 0) {
      formattedPhone = "(" + formattedPhone;
    }

    phoneControl.setValue(formattedPhone, { emitEvent: false });
  }

  private handleCountryChange(country: string): void {
    this.form.get('zip')?.setValue('')
    this.form.get('canadaZip')?.setValue('')
    this.form.get('ukZip')?.setValue('')
    if (country === 'United States' || country === 'Mexico') {
      this.form.get('zip')?.setValidators([Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]+$')])
      this.form.get('canadaZip')?.clearValidators()
      this.form.get('ukZip')?.clearValidators()
    } else if (country === 'Canada') {
      this.form.get('canadaZip')?.setValidators([Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')])
      this.form.get('zip')?.clearValidators()
      this.form.get('ukZip')?.clearValidators()
    } else if (country === 'United Kingdom') {
      this.form.get('ukZip')?.setValidators([Validators.required, Validators.minLength(7), Validators.pattern('^[a-zA-Z0-9]+$')])
      this.form.get('zip')?.clearValidators()
      this.form.get('canadaZip')?.clearValidators()
    } else {
      this.form.get('zip')?.clearValidators()
      this.form.get('canadaZip')?.clearValidators()
      this.form.get('ukZip')?.clearValidators()
    }

    this.form.get('zip')?.updateValueAndValidity({ emitEvent: false })
    this.form.get('canadaZip')?.updateValueAndValidity({ emitEvent: false })
    this.form.get('ukZip')?.updateValueAndValidity({ emitEvent: false })

    this.form.get('city')?.setValue('');
    this.form.get('state')?.setValue('');
    this.form.get('canadaState')?.setValue('');
    if (country === 'United States' || country === 'Mexico') {
      this.form.get('city')?.setValidators([Validators.required]);
      this.form.get('state')?.setValidators([Validators.required]);
      this.form.get('canadaState')?.clearValidators();
    } else if (country === 'Canada') {
      this.form.get('canadaState')?.setValidators([Validators.required]);
      this.form.get('city')?.clearValidators();
      this.form.get('state')?.clearValidators();
    } else if (country === 'United Kingdom') {
      this.form.get('city')?.setValidators([Validators.required]);
      this.form.get('state')?.clearValidators();
      this.form.get('canadaState')?.clearValidators();
    } else if (country === 'India') {
      this.form.get('state')?.setValidators([Validators.required]);
      this.form.get('city')?.clearValidators();
      this.form.get('canadaState')?.clearValidators();
    } else {
      this.form.get('city')?.clearValidators();
      this.form.get('state')?.clearValidators();
      this.form.get('canadaState')?.clearValidators();
    }

    this.form.get('city')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('state')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('canadaState')?.updateValueAndValidity({ emitEvent: false });

    this.form.get('workAuthorization')?.setValue('')
    if (country === 'India') {
      this.form.get('majorGrade')?.setValidators([Validators.required, Validators.pattern('^[0-9]+$')])
      this.form.get('twelfthGrade')?.setValidators([Validators.required, Validators.pattern('^[0-9]+$')])
      this.form.get('tenthGrade')?.setValidators([Validators.required, Validators.pattern('^[0-9]+$')])
      this.form.get('workAuthorization')?.clearValidators()
    } else {
      this.form.get('workAuthorization')?.setValidators([Validators.required])
      this.form.get('majorGrade')?.clearValidators()
      this.form.get('twelfthGrade')?.clearValidators()
      this.form.get('tenthGrade')?.clearValidators()
      this.form.get('majorGrade')?.setValue('')
      this.form.get('twelfthGrade')?.setValue('')
      this.form.get('tenthGrade')?.setValue('')
    }

    this.form.get('workAuthorization')?.updateValueAndValidity({ emitEvent: false })
    this.form.get('majorGrade')?.updateValueAndValidity({ emitEvent: false })
    this.form.get('twelfthGrade')?.updateValueAndValidity({ emitEvent: false })
    this.form.get('tenthGrade')?.updateValueAndValidity({ emitEvent: false })

    this.schools = this.form.value.country === 'Mexico' ? MEXICO_SCHOOLS : US_SCHOOLS;
    this.filterMajors(null);
    this.filterSchools(null);
    this.handleCurrentStudentChange(this.form.value.currentStudent);
  }
  private handleCurrentStudentChange(currentStudent: string): void {
    this.calculateGraduationYears(currentStudent);

    this.form.get('levelOfEducation')?.setValue('');
    this.form.get('graduationMonth')?.setValue('');
    this.form.get('graduationYear')?.setValue('');
    this.form.get('major')?.setValue('');
    this.form.get('majorID')?.setValue('');
    this.form.get('school')?.setValue('');
    this.form.get('schoolID')?.setValue('');
    this.form.get('branch')?.setValue('');

    const country = this.form.get('country')?.value;
    this.form.get('levelOfEducation')?.setValidators([Validators.required]);
    if (country === 'United States' || country === 'Mexico') {
      this.form.get('major')?.setValidators([Validators.required]);
      this.form.get('school')?.setValidators([Validators.required]);
      this.form.get('branch')?.clearValidators();
    } else if (country === 'India') {
      this.form.get('major')?.clearValidators();
      this.form.get('school')?.clearValidators();
      this.form.get('branch')?.setValidators([Validators.required]);
    } else {
      this.form.get('major')?.clearValidators();
      this.form.get('school')?.clearValidators();
      this.form.get('branch')?.clearValidators();
    }
    if (currentStudent === 'yes' || (currentStudent && country === 'India')) {
      this.form.get('graduationMonth')?.setValidators([Validators.required]);
      this.form.get('graduationYear')?.setValidators([Validators.required]);
    } else {
      this.form.get('graduationMonth')?.clearValidators();
      this.form.get('graduationYear')?.clearValidators();
    }

    this.form.get('levelOfEducation')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('graduationMonth')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('graduationYear')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('major')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('majorID')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('school')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('schoolID')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('branch')?.updateValueAndValidity({ emitEvent: false });
  }

  private onBranchChange(selectedValue: string): void {
    const selectedBranch = this.branches.find((branch) => branch.value === selectedValue);

    if (selectedBranch) {
      this.form.patchValue({
        major: selectedBranch.label,
        majorID: selectedBranch.value
      });
    } else {
      this.form.patchValue({
        major: '',
        majorID: ''
      });
    }
  }

  private handleWorkAuthorizationChange(workAuthorization: string): void {
    if (workAuthorization === 'yes') {
      this.showSponsorshipFields = true;
      this.form.get('sponsorship')?.setValidators([Validators.required])
    } else {
      this.showSponsorshipFields = false;
      this.showFutureSponsorshipFields = false;
      this.form.get('sponsorship')?.clearValidators()
      this.form.get('sponsorship')?.setValue('')
      this.form.get('futureSponsorship')?.clearValidators()
      this.form.get('futureSponsorship')?.setValue('')
    }

    this.form.get('sponsorship')?.updateValueAndValidity({ emitEvent: false })
    this.form.get('futureSponsorship')?.updateValueAndValidity({ emitEvent: false })
  }

  private handleSponsorshipChange(value: string): void {
    if (value === 'no') {
      this.showFutureSponsorshipFields = true
      this.form.get('futureSponsorship')?.setValidators([Validators.required])
    } else {
      this.showFutureSponsorshipFields = false
      this.form.get('futureSponsorship')?.clearValidators()
      this.form.get('futureSponsorship')?.setValue('')
    }
    this.form.get('futureSponsorship')?.updateValueAndValidity({ emitEvent: false })
  }

  filterMajors(event: any) {
    const query = event?.target?.value?.toLowerCase();
    this.filteredMajors = event ? MAJORS.sort((a, b) => a.label.localeCompare(b.label)).filter(major =>
      major.label.toLowerCase().includes(query)
    ) : MAJORS.sort((a, b) => a.label.localeCompare(b.label));
  }

  filterSchools(event: any) {
    const query = event?.target?.value?.toLowerCase();
    this.filteredSchools = event ? this.schools.sort((a, b) => a.label.localeCompare(b.label)).filter(school =>
      school.label.toLowerCase().includes(query)
    ) : this.schools.sort((a, b) => a.label.localeCompare(b.label));
  }

  selectAutoCompleteValue(event: any, formControl: string, ObjectValue: any) {
    event.stopPropagation();
    switch (formControl) {
      case ('major'):
        this.form.patchValue({
          major: ObjectValue.label,
          majorID: ObjectValue.value
        });
        this.formAuditValue.major = {
          label: ObjectValue.label,
          value: ObjectValue.value
        }
        break;
      case ('school'):
        this.form.patchValue({
          school: ObjectValue.label,
          schoolID: ObjectValue.value
        });
        this.formAuditValue.school = {
          label: ObjectValue.label,
          value: ObjectValue.value
        }
        break;
    }
    this.focusedControl[formControl] = false;
  }

  setFocusedControl(event: any, formControl: any, value: any) {
    event.preventDefault();
    this.focusedControl[formControl] = value;
    if (formControl === 'major') {
      if (this.formAuditValue.major.label !== this.form.value.major || !this.form.value.majorID) {
        this.form.get('major')?.setValue('');
        this.form.get('majorID')?.setValue('');
      }
      this.filterMajors(null);
    }
    else if (formControl === 'school') {
      if (this.formAuditValue.school.label !== this.form.value.school || !this.form.value.schoolID) {
        this.form.get('school')?.setValue('');
        this.form.get('schoolID')?.setValue('');
      }
      this.filterSchools(null);
    }
  }

  private calculateGraduationYears(currentStudent: string): void {
    const currentYear = currentStudent == "yes" ? new Date().getFullYear() : new Date().getFullYear() - 2;
    const years = currentStudent == "yes" ? 5 : 3;
    this.graduationYears = Array.from({ length: years }, (_, i) => currentYear + i);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.fileError = '';
    this.fileSuccess = '';

    const allowedExtensions = ['pdf', 'doc', 'docx', 'rtf', 'txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      this.fileError = 'Invalid file type.';
      return;
    }

    if (file.size > 5242880) {
      this.fileError = 'File size is too large.';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const rawData = result.split('base64,')[1];

      this.form.patchValue({
        computer_data: file.name,
        computer_data_result: rawData,
        FileBase64: rawData,
        FileExt: file.type,
        dropbox: null
      });

      this.fileSuccess = 'Resume ready to upload';
    };
    reader.readAsDataURL(file);
  }

  onDropboxClick(): void {
    if (!this.dropboxReady) {
      return;
    }

    Dropbox.choose({
      success: (files: any[]) => this.handleDropboxFileChange(files[0]),
      linkType: 'preview',
      multiselect: false,
      extensions: ['.doc', '.docx', '.pdf', '.txt', '.rtf']
    });
  }

  handleDropboxFileChange(file: any): void {
    this.fileError = '';
    this.fileSuccess = '';

    if (file.bytes > 5242880) {
      this.fileError = 'File size is too large.';
      return;
    }
    const extension = file.link.split("/").pop().split("#")[0].split("?")[0];
    let url = file.link.replace("dl=0", "dl=1");
    url = url?.trim();
    this.form.patchValue({
      computer_data: null,
      dropbox: url,
      Resumedropbox: extension
    });

    this.fileSuccess = 'Resume ready to upload';
  }

  recaptchaSuccessCallback(response: any) {
    this.form.get('validCaptacha')?.setValue(response ? true : false)
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (!this.form.get('computer_data')?.value && !this.form.get('dropbox')?.value) {
        this.fileError = 'Please upload a resume.';
      }
      if (!this.form.get('validCaptacha')?.value) {
        this.form.get('validCaptacha')?.setValue(false);
      }
      return;
    }

    if (!this.form.get('computer_data')?.value && !this.form.get('dropbox')?.value) {
      this.fileError = 'Please upload a resume.';
      return;
    }

    if (!this.form.get('validCaptacha')?.value) {
      this.form.get('validCaptacha')?.setValue(false);
      return;
    }

    this.loading = true;
    this.showSubmitButton = false;

    try {
      await this.uploadResume();
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Error submitting resume, Please try again.');
      this.loading = false;
      this.showSubmitButton = true;
    }
  }

  async uploadResume(): Promise<void> {
    const formData = this.form.value;
    if (formData.computer_data) {
      const response = await this.uploadFileViaApi(formData);
      if (response.success) {
        this.form.patchValue({ resumeURL: response.link });
        const formDataObject = this.prepareFormData();
        await this.submitForm(formDataObject);
      } else {
        this.fileError = 'There was an error uploading your file. Please try again.';
        this.loading = false;
        this.showSubmitButton = true;
        throw new Error('Resume upload failed');
      }
    } else if (formData.dropbox) {
      const formDataObject = this.prepareFormData();
      await this.submitForm(formDataObject);
    } else {
      this.fileError = "Please upload a resume.";
      this.loading = false;
      this.showSubmitButton = true;
      throw new Error('No resume uploaded');
    }
  }

  prepareFormData(): any {
    let formDataObject = { ...this.form.value };
    if (formDataObject.country === "Canada") {
      formDataObject.zip = formDataObject.canadaZip;
      formDataObject.state = formDataObject.canadaState;
    } else if (formDataObject.country === "United Kingdom") {
      formDataObject.zip = formDataObject.ukZip;
    } else if (formDataObject.country === "India") {
      if (formDataObject.levelOfEducation.includes("Bachelor's Degree")) {
        formDataObject.levelOfEducation = "Bachelor's Degree";
      } else if (formDataObject.levelOfEducation.includes("Master's Degree")) {
        formDataObject.levelOfEducation = "Master's Degree";
      }
    }

    if (["United Kingdom", "Canada", "United States", "Mexico"].includes(formDataObject.country)) {
      formDataObject.workAuthorization = formDataObject.workAuthorization === "yes" &&
        formDataObject.sponsorship === "no" &&
        formDataObject.futureSponsorship === "no"
        ? "Yes"
        : "No";
    }

    const queryParams = this.getQueryParams();
    const standardizedQuery = this.standardizeQueryParams(queryParams);

    formDataObject = {
      url: window?.location?.href.split('#')[0] || "",
      ApplicationDevice__c: window.innerWidth < 640 ? "Mobile" : "Desktop",
      irClickId: standardizedQuery?.irclickid || "",
      searchEngine: standardizedQuery?.searchengine || "",
      searchString: standardizedQuery?.srstring || "",
      payPerClickKeyword: standardizedQuery?.keyword || "",
      gCLID: standardizedQuery?.gclid || "",
      uTMTerm: standardizedQuery?.utm_term || "",
      uTMCampaign: standardizedQuery.utm_campaign || "",
      uTMContent: standardizedQuery.utm_content || "",
      uTMMedium: standardizedQuery.utm_medium || "",
      uTMSource: standardizedQuery.utm_source || "",
      uTMSchoolID: standardizedQuery.utm_schoolid || "",
      referrerURL: document.referrer || "Direct",
      uTMReferrerName: standardizedQuery.utm_referrername || "",
      campaignvalue: standardizedQuery.campaignvalue || "",
      appcastClickID: '',
      sourcedBy: standardizedQuery.sourcedby || "",
      referredByEmail: standardizedQuery.referredByEmail || "",
      referredBy: standardizedQuery.ra || "",
      referredByUser: standardizedQuery.ru || "",
      dropbox: '',
      veteran: (window?.location?.href.split('#')[0] || "").includes("veteran"),
      Resumedropbox: '',
      ...formDataObject,
      leadDate: new Date().toISOString(),
      phone: formDataObject.phone.replace(/\D/g, ""),
      FileBase64: '',
      FileExt: '',
      ResumeUpload: '',
      computer_data: '',
      computer_data_result: '',
      graduationDate: formDataObject.graduationMonth ? `${formDataObject.graduationYear}-${formDataObject.graduationMonth}-01` : "",
      dataConsent: formDataObject.dataConsent == "on",
      leadType: "Revature"
    };
    delete formDataObject["computer_data"];
    delete formDataObject["computer_data_result"];
    delete formDataObject["g-recaptcha-response"];
    return formDataObject;
  }

  async submitForm(formDataObject: any): Promise<void> {
    const apiUrl = ENV_VAR.FORM_API_ENDPOINT;
    const queryString = this.createQueryString(formDataObject); //new HttpParams({fromObject: formDataObject}).toString();
    const apiUrlWithParams = apiUrl + '?' + queryString;
    try {
      const response: any = await this.http.get(apiUrlWithParams).toPromise();
      if (response?.status === "ok") {
        console.log('Form data submitted successfully');
      } else {
        console.error('Error submitting form data');
      }
      this.navigateToThankYouPage(formDataObject.firstName);
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Error submitting form data, Please try again.');
      this.loading = false;
      this.showSubmitButton = true;
      throw error;
    }
  }

  navigateToThankYouPage(firstName: string): void {
    window.location.href = `/thank-you-for-submission?name=${btoa(firstName)}`;
  }

  getQueryParams(): any {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams;
  }

  standardizeQueryParams(queryParams: any): any {
    const standardizedQueryParams: any = {};
    queryParams.forEach((value: any, key: any) => {
      if (key === 'slug') {
        return;
      }
      const lowercasedKey = key.toLowerCase();
      standardizedQueryParams[lowercasedKey] = lowercasedKey.includes('utm') ? value.toLowerCase() : value;
    });
    return standardizedQueryParams;
  }

  createQueryString(data: any): string {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  uploadFileViaApi(formData: any): Promise<any> {
    const payload = {
      key: "245583662863Rk863369",
      person: `${formData.firstName} ${formData.lastName}`,
      filename: formData.computer_data,
      file: formData.computer_data_result,
    };
    return this.http.post(ENV_VAR.RESUME_API_ENDPOINT, payload).toPromise();
  }
}