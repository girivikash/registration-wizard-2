import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
});

const step2Schema = z
  .object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

const formSchema = step1Schema.merge(step2Schema);

const step1Fields = ['firstName', 'lastName', 'dob'];
const step2Fields = ['email', 'password', 'confirmPassword'];

function App() {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentSchema = useMemo(() => {
    if (step === 1) return step1Schema;
    if (step === 2) return step2Schema;
    return formSchema;
  }, [step]);

  const resolver = useCallback(
    (values, context, options) => zodResolver(currentSchema)(values, context, options),
    [currentSchema]
  );

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver,
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const watchedValues = watch();

  const stepFields = step === 1 ? step1Fields : step === 2 ? step2Fields : [];

  const isCurrentStepValid = useMemo(() => {
    if (step === 3) return true;

    if (step === 1) {
      return Boolean(watchedValues.firstName && watchedValues.lastName && watchedValues.dob);
    }

    const emailValid = typeof watchedValues.email === 'string' && watchedValues.email.includes('@');
    const passwordValid = typeof watchedValues.password === 'string' && watchedValues.password.length >= 8;
    const confirmValid = watchedValues.confirmPassword === watchedValues.password && watchedValues.confirmPassword.length > 0;
    return emailValid && passwordValid && confirmValid;
  }, [step, watchedValues]);

  const goNext = async () => {
    const valid = await trigger(stepFields);
    if (valid) {
      setStep((current) => Math.min(current + 1, 3));
    }
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const onSubmit = (data) => {
    console.log('Final registration payload:', data);
    setSuccess(true);
  };

  return (
    <div className="page-shell">
      <div className="card">
        <div className="header">
          <div>
            <h1>Registration Wizard</h1>
            <p>Segmented onboarding for a better enterprise experience.</p>
          </div>
          <div className="progress-text">Step {step} of 3</div>
        </div>

        <div className="progress-bar">
          <div className={`progress-fill step-${step}`} />
        </div>

        {success ? (
          <div className="success-panel">
            <h2>Success!</h2>
            <p>Your account registration completed successfully.</p>
            <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {step === 1 && (
              <section className="step-panel">
                <h2>Personal Info</h2>
                <div className="field-row">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" type="text" {...register('firstName')} />
                  {errors.firstName && <span className="field-error">{errors.firstName.message}</span>}
                </div>

                <div className="field-row">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" type="text" {...register('lastName')} />
                  {errors.lastName && <span className="field-error">{errors.lastName.message}</span>}
                </div>

                <div className="field-row">
                  <label htmlFor="dob">Date of Birth</label>
                  <input id="dob" type="date" {...register('dob')} />
                  {errors.dob && <span className="field-error">{errors.dob.message}</span>}
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="step-panel">
                <h2>Account Details</h2>
                <div className="field-row">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" {...register('email')} />
                  {errors.email && <span className="field-error">{errors.email.message}</span>}
                </div>

                <div className="field-row password-row">
                  <div className="password-label-row">
                    <label htmlFor="password">Password</label>
                    <button
                      type="button"
                      className="toggle-button"
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  {errors.password && <span className="field-error">{errors.password.message}</span>}
                </div>

                <div className="field-row password-row">
                  <div className="password-label-row">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <button
                      type="button"
                      className="toggle-button"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message}</span>}
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="step-panel">
                <h2>Review & Submit</h2>
                <div className="summary-grid">
                  <div>
                    <label>First Name</label>
                    <div>{watchedValues.firstName || '—'}</div>
                  </div>
                  <div>
                    <label>Last Name</label>
                    <div>{watchedValues.lastName || '—'}</div>
                  </div>
                  <div>
                    <label>Date of Birth</label>
                    <div>{watchedValues.dob || '—'}</div>
                  </div>
                  <div>
                    <label>Email</label>
                    <div>{watchedValues.email || '—'}</div>
                  </div>
                </div>
                <p className="review-note">Please confirm your data before submission.</p>
              </section>
            )}

            <div className="button-row">
              {step > 1 && (
                <button type="button" className="button secondary" onClick={goBack}>
                  Back
                </button>
              )}
              {step < 3 && (
                <button type="button" className="button primary" onClick={goNext} disabled={!isCurrentStepValid}>
                  Next
                </button>
              )}
              {step === 3 && (
                <button type="submit" className="button primary">
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
