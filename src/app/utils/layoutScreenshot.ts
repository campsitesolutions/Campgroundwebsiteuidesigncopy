/**
 * Utility to generate layout preview images for email attachments
 */

/**
 * Generates a canvas-based image of the layout that can be embedded in emails
 * Returns a base64 data URL of the image
 */
export async function generateLayoutImage(
  sectionNames: string[],
  branding: { companyName: string; logoUrl?: string },
  paletteColors: { primary: string; secondary: string; accent: string }
): Promise<string> {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '800px';
  container.style.backgroundColor = 'white';
  document.body.appendChild(container);

  // Generate the HTML content
  container.innerHTML = generateLayoutHTML(sectionNames, branding, paletteColors);

  // Wait for any images to load
  await new Promise(resolve => setTimeout(resolve, 100));

  // Capture the screenshot using html2canvas
  try {
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(container, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality
      logging: false,
    });

    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png');

    // Clean up
    document.body.removeChild(container);

    return dataUrl;
  } catch (error) {
    console.error('Failed to generate layout image:', error);
    document.body.removeChild(container);
    return '';
  }
}

/**
 * Generates an HTML representation of the custom layout
 * This creates a simple visual layout that can be embedded in emails
 * Uses table-based layout for maximum email client compatibility
 */
export function generateLayoutHTML(
  sectionNames: string[],
  branding: { companyName: string; logoUrl?: string },
  paletteColors: { primary: string; secondary: string; accent: string }
): string {
  if (sectionNames.length === 0) {
    return '<p style="color: #666; font-style: italic;">No sections selected</p>';
  }

  const sectionRows = sectionNames
    .map((name, index) => {
      const bgColor = index % 2 === 0 ? '#f9fafb' : '#ffffff';
      return `
        <tr>
          <td style="background-color: ${bgColor}; padding: 16px; border-left: 4px solid ${paletteColors.accent};">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="40" valign="middle">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background-color: ${paletteColors.primary}; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; text-align: center; font-weight: bold; font-size: 14px; font-family: Arial, sans-serif; line-height: 32px;">
                        ${index + 1}
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="middle" style="font-weight: 600; color: #1f2937; font-size: 16px; font-family: Arial, sans-serif; padding-left: 12px;">
                  ${name}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    })
    .join('');

  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 2px solid #e5e7eb; border-radius: 8px; font-family: Arial, sans-serif;">
      <!-- Header -->
      <tr>
        <td style="background-color: ${paletteColors.primary}; padding: 24px; text-align: center; border-radius: 6px 6px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-family: Arial, sans-serif; font-weight: bold;">
            ${branding.companyName || 'Custom Layout Preview'}
          </h2>
        </td>
      </tr>
      
      <!-- Subheader -->
      <tr>
        <td style="padding: 16px 16px 8px 16px;">
          <h3 style="font-family: Arial, sans-serif; color: #374151; font-size: 18px; margin: 0; font-weight: bold;">
            Layout Structure (${sectionNames.length} sections)
          </h3>
        </td>
      </tr>
      
      <!-- Sections -->
      ${sectionRows}
      
      <!-- Footer -->
      <tr>
        <td style="background-color: ${paletteColors.secondary}; padding: 16px; text-align: center; border-top: 2px solid ${paletteColors.accent}; border-radius: 0 0 6px 6px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px; font-family: Arial, sans-serif;">
            Built with CampSite Solutions
          </p>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Generates layout info text for plain text emails
 */
export function generateLayoutText(sectionNames: string[]): string {
  if (sectionNames.length === 0) {
    return 'No sections selected';
  }

  return sectionNames
    .map((name, index) => `${index + 1}. ${name}`)
    .join('\n');
}