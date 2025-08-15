import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CANADA_SCHOOLS, CANADA_STATE_VALUES, ENV_VAR, MAJORS, MEXICO_SCHOOLS, MEXICO_STATE_VALUES, US_SCHOOLS, US_STATE_VALUES, WORK_AUTH_VALUES } from '../common/form-contants';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-recruitment-form',
  templateUrl: './recruitment-form.component.html',
  styleUrl: './recruitment-form.component.scss'
})
export class RecruitmentFormComponent {
  form: FormGroup;
  filteredMajors: any[] = [];
  filteredSchools: any[] = [];
  showOtherLeadSource = false;
  showOpportunityField = false;
  showCaptcha = true;
  resumeUploading = false;
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
  workAuthorizationValues: any[] = WORK_AUTH_VALUES;
  schools = US_SCHOOLS;
  marketingPrograms: string[] = [];
  states: string[] = [];
  resumeDocumentName: string = "Computer"
  focusedControl: any = {
    school: false,
    major: false
  }

  uploadImages = {
    default: 'https://cdn.prod.website-files.com/665dfe6f26741ce6ca5a2d67/687a566342e4f5cb94aa0285_computer_arrow_up%20(1).svg',
    hover: 'https://cdn.prod.website-files.com/665dfe6f26741ce6ca5a2d67/687a566639afb6f59491bbe7_computer_arrow_up.svg'
  };

  currentUploadImage = this.uploadImages.default;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.setupFormSubscriptions();
    this.filterMajors(null);
    this.filterSchools(null);
  }

  recaptchaSuccessCallback(response: any) {
    this.form.get('validCaptacha')?.setValue(response ? true : false)
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      personSource: ['', Validators.required],
      otherLeadSource: [''],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, this.validateEmail]],
      country: ['', Validators.required],
      marketingProgram: ['', Validators.required],
      sourcedForOpp: [''],
      major: ['', Validators.required],
      majorID: ['', Validators.required],
      school: ['', Validators.required],
      schoolID: ['', Validators.required],
      graduationDate: ['', Validators.required],
      workAuthorization: ['', Validators.required],
      levelOfEducation: ['', Validators.required],
      sourcedBy: [''],
      state: ['', Validators.required],
      recruitedBy: [''],
      resumeURL: ['', Validators.required],
      leadDate: [new Date().toISOString()],
      validCaptacha: [''],
      veteran: ['false'],
      leadType: ['Recruiting']
    });
  }

  private validateEmail(control: any): { [key: string]: boolean } | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/;

    return emailPattern.test(control.value) ? null : { invalidEmail: true };
  };

  private setupFormSubscriptions() {
    this.form.get('personSource')?.valueChanges.subscribe(value => {
      this.showOtherLeadSource = value === 'Other';
      if (value === 'Other') {
        this.form.get('otherLeadSource')?.setValidators(Validators.required);
      } else {
        this.form.get('otherLeadSource')?.clearValidators();
      }
      this.form.get('otherLeadSource')?.updateValueAndValidity();
    });

    this.form.get('country')?.valueChanges.subscribe(value => {
      this.handleCountryChange(value);
    });

    this.form.get('marketingProgram')?.valueChanges.subscribe(value => {
      this.handleMarketingProgramChange(value);
    });
    this.form.get('firstName')?.valueChanges.subscribe(value => {
      const formattedValue = this.capitalizeFirstLetter(value);
      if (value !== formattedValue) {
        this.form.get('firstName')?.setValue(formattedValue, { emitEvent: false });
      }
    });

    this.form.get('lastName')?.valueChanges.subscribe(value => {
      const formattedValue = this.capitalizeFirstLetter(value);
      if (value !== formattedValue) {
        this.form.get('lastName')?.setValue(formattedValue, { emitEvent: false });
      }
    });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  handleCountryChange(country: string) {
    this.showOpportunityField = false;
    this.form.patchValue({
      marketingProgram: '',
      sourcedForOpp: '',
      state: '',
      schoolID: '',
      school: ''
    });

    if (!country) {
      this.workAuthorizationValues = WORK_AUTH_VALUES;
      this.marketingPrograms = [];
      this.states = [];
      return;
    }

    switch (country) {
      case 'United States':
        this.workAuthorizationValues = ["U.S. Citizen", "Green Card", "Permanent Resident", "EAD", "H1B", "OPT", "CPT", "F1", "L1", "H4", "TN", "DACA", "Other", "Yes"];
        this.marketingPrograms = ['SPC_Cont_Spec_NoExp', 'SPC_Experienced_Hire', 'General-Entry Level'];
        this.states = US_STATE_VALUES;
        this.schools = US_SCHOOLS;
        break;
      case 'Mexico':
        this.workAuthorizationValues = ["Mexican citizen", "Permanent Resident", "Asylee", "Other", "Yes"];
        this.marketingPrograms = ['SPC_Cont_Spec_NoExp', 'SPC_Mexico_HTD'];
        this.states = MEXICO_STATE_VALUES;
        this.schools = MEXICO_SCHOOLS;
        break;
      case 'Canada':
        this.workAuthorizationValues = ["Canadian Citizen", "Canadian Permanent Resident", "Other", "Yes"];
        this.marketingPrograms = ['SPC_Cont_Spec_NoExp', 'SPC_Experienced_Hire', 'Canada'];
        this.states = CANADA_STATE_VALUES;
        this.schools = CANADA_SCHOOLS;
        break;
      case 'United Kingdom':
        this.workAuthorizationValues = ["U.S. Citizen", "Green Card", "Canadian Citizen", "Mexican citizen", "Permanent Resident", "Canadian Permanent Resident", "EAD", "H1B", "OPT", "CPT", "F1", "L1", "H4", "TN", "DACA", "Asylee", "Other", "Yes"];
        this.marketingPrograms = ['SPC_Cont_Spec_NoExp', 'Experienced Hire', 'United Kingdom'];
        this.states = US_STATE_VALUES;
        this.schools = US_SCHOOLS;
        break;
      default:
        this.workAuthorizationValues = WORK_AUTH_VALUES;
    }
    this.filterSchools(null);
  }

  handleMarketingProgramChange(program: string) {
    this.showOpportunityField = ['SPC_Experienced_Hire', 'SPC_Cont_Spec_NoExp'].includes(program);

    if (this.showOpportunityField && ['SPC_Experienced_Hire'].includes(program)) {
      this.form.get('sourcedForOpp')?.setValidators(Validators.required);
    } else {
      this.form.get('sourcedForOpp')?.clearValidators();
      this.form.patchValue({ sourcedForOpp: '' });
    }
    this.form.get('sourcedForOpp')?.updateValueAndValidity();
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

  resetFormState() {
    this.filteredMajors = [];
    this.filteredSchools = [];
    this.showOtherLeadSource = false;
    this.showOpportunityField = false;
    this.resumeUploading = false;
    this.formAuditValue = {
      school: { label: '', value: '' },
      major: { label: '', value: '' }
    };
    this.schools = US_SCHOOLS;
    this.marketingPrograms = [];
    this.states = [];
    this.resumeDocumentName = "Computer";
    this.focusedControl = {
      school: false,
      major: false
    };
    this.initForm();
  }

  async handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const allowedExtensions = ['pdf', 'doc', 'docx', 'rtf', 'txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!allowedExtensions.includes(fileExtension || '')) {
      alert('Invalid file type.');
      return;
    }

    if (file.size > 5242880) {
      alert('File size is too large.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      const rawData = result.split('base64,')[1];
      this.resumeUploading = true;
      this.resumeDocumentName = "Uploading...";
      try {
        const response = await this.uploadResume(file.name, rawData);
        if (response.link) {
          this.form.patchValue({ resumeURL: response.link });
        }
        this.resumeDocumentName = file.name;
      } catch {
        this.resumeDocumentName = "Error";
      } finally {
        this.resumeUploading = false;
      }
    };
    reader.readAsDataURL(file);
  }

  private uploadResume(filename: string, fileData: string): Promise<any> {
    return this.http.post('https://8y1ub2vjek.execute-api.us-east-1.amazonaws.com/prod/ResumePush', {
      key: '245583662863Rk863369',
      person: 'Sourcer',
      filename,
      file: fileData
    }).toPromise();
  }

  async onSubmit() {
    if (this.sharedService.hasSuspiciousContent(this.form.value)) {
      return;
    }
    if (this.form.invalid) {
      if (this.form.invalid) {
        Object.keys(this.form.controls).forEach(key => {
          const control = this.form.get(key);
          if (control?.invalid) {
            control.markAsTouched();
            console.log(key + " is Invalid")
          }
        });
      }
      return;
    }

    const phone = this.form.get('phone')?.value;
    switch (this.form.get('country')?.value) {
      case "Mexico":
        this.form.get('phone')?.setValue("+52" + phone);
        break;
      case "United Kingdom":
        this.form.get('phone')?.setValue("+44" + phone);
        break;
    }

    try {
      const params = new HttpParams({ fromObject: this.form.value });
      const response = await this.http.get(ENV_VAR.FORM_API_ENDPOINT,
        { params }
      ).subscribe((res: any) => {
        if (res.status === 'ok') {
          this.showCaptcha = false;
          console.log('Form submitted successfully');
          alert('Form submitted successfully');
          window.location.reload();
        }
      });
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setTimeout(() => {
        this.showCaptcha = true;
      }, 200)
    }
  }

  onUploadHover(): void {
    this.currentUploadImage = this.uploadImages.hover;
  }

  onUploadLeave(): void {
    this.currentUploadImage = this.uploadImages.default;
  }
}
