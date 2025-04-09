import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // In a real application, you would send an email or store in a database
    console.log('Contact form submission:', data);

    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    // Replace console.log with console.error (around line 16)
    try {
      // Process the form data
      const formData = await request.json();
      if (!formData.name || !formData.email || !formData.message) {
        return NextResponse.json(
          { error: 'Name, email, and message are required' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Error processing contact form:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to process your request' },
        { status: 500 }
      );
    }
  }
}
