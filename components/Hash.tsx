'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { HashRequest, HashResponse } from '@/utils/service';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import LoadingDots from '@/components/ui/loadingdots';



const generateFormSchema = z.object({
  hashInput: z.string().min(1)
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const Hash = ({}: {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<HashResponse | null>(null);
  const [hashOutput, setHashOuput] = useState('');

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',

    // Set default values so that the form inputs are controlled components.
    defaultValues: {
      hashInput: '',
    },
  });

  
  const handleSubmit = useCallback(
    async (values: GenerateFormValues) => {
      setIsLoading(true);
      setResponse(null);

      try {
        const request: HashRequest = {
          hashInput: values.hashInput,
        };
        const response = await fetch('/api/hash', {
          method: 'POST',
          body: JSON.stringify(request),
        });

        // Handle API errors.
        if (!response.ok || response.status !== 200) {
          const text = await response.text();
          throw new Error(
            `Failed to hash input: ${response.status}, ${text}`,
          );
        } else {
          const { hash } = await response.json();
          setHashOuput(hash);
        }
      } catch (error) {

        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="hashInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hash Input</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A city view with clouds"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center
                 max-w-[200px] mx-auto w-full"
                >
                  {isLoading ? (
                    <LoadingDots color="white" />
                  ) : response ? (
                    '✨ Regenerate Hash'
                  ) : (
                    'Generate Hash'
                  )}
                </Button>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </Form>
        </div>
        <div className="col-span-full">
          {hashOutput && (
            <>
              <p className="mb-2">Hashed Output</p>
              <Textarea
                  className="resize-none"
                >
                {hashOutput}
                </Textarea>

             </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hash;
