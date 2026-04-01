#!/usr/bin/env python3
"""
Add GA4 tracking to all HTML files in a scalable, future-proof way.
This script is idempotent - safe to run multiple times.
"""

import os
import re
from pathlib import Path

# GA4 tracking code to add
GA4_GTAG_SCRIPT = '  <script async src="https://www.googletagmanager.com/gtag/js?id=G-KZ73GY8NTH"></script>'
GA4_ANALYTICS_SCRIPT = '  <script src="analytics.js"></script>'
GA4_MARKER = '<!-- GA4 Tracking (auto-added) -->'

def should_add_tracking(content):
    """Check if GA4 tracking is already present."""
    return 'G-KZ73GY8NTH' not in content and GA4_MARKER not in content

def add_ga4_tracking(file_path):
    """Add GA4 tracking to an HTML file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already added
    if not should_add_tracking(content):
        print(f"⏭️  {file_path.name}: GA4 already present, skipping")
        return False

    # Find closing </head> tag
    head_close_match = re.search(r'</head>', content, re.IGNORECASE)
    if not head_close_match:
        print(f"❌ {file_path.name}: No </head> tag found, skipping")
        return False

    # Insert GA4 tracking before </head>
    insertion_point = head_close_match.start()
    ga4_code = f'\n  {GA4_MARKER}\n{GA4_GTAG_SCRIPT}\n{GA4_ANALYTICS_SCRIPT}\n'

    new_content = content[:insertion_point] + ga4_code + content[insertion_point:]

    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✅ {file_path.name}: GA4 tracking added")
    return True

def main():
    """Process all HTML files in the directory."""
    repo_path = Path('.')
    html_files = list(repo_path.glob('*.html'))

    print(f"Found {len(html_files)} HTML files\n")

    added_count = 0
    for html_file in sorted(html_files):
        if add_ga4_tracking(html_file):
            added_count += 1

    print(f"\n✨ Complete! Added GA4 tracking to {added_count} files")
    print("📊 Analytics code is now centralized in analytics.js")
    print("🔄 Future GA4 updates only need to be made in analytics.js")

if __name__ == '__main__':
    main()
