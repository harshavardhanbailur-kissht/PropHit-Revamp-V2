import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

interface FeedbackPayload {
  feedback: string;
  page: string;
  pageName: string;
  userAgent: string;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const body: FeedbackPayload = await request.json();

    if (!body.feedback || body.feedback.trim().length === 0) {
      return NextResponse.json(
        { error: 'Feedback text is required' },
        { status: 400 }
      );
    }

    if (body.feedback.length > 500) {
      return NextResponse.json(
        { error: 'Feedback must be 500 characters or less' },
        { status: 400 }
      );
    }

    if (GOOGLE_SCRIPT_URL) {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: body.timestamp,
          page: body.page,
          pageName: body.pageName,
          feedback: body.feedback,
          userAgent: body.userAgent,
        }),
      });

      if (!response.ok) {
        console.error('Google Sheets API error:', response.status);
        return NextResponse.json(
          { error: 'Failed to save feedback' },
          { status: 502 }
        );
      }
    } else {
      console.log('FEEDBACK RECEIVED:', {
        timestamp: body.timestamp,
        page: body.page,
        pageName: body.pageName,
        feedback: body.feedback,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
