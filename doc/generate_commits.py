import subprocess
import json
import os
import sys


def generate_commit_json():
    """
    Fetches Git commit history, structures the data, and writes it to a
    JSON file in the '_generated_static' directory for Sphinx to include.

    This method avoids manually formatting JSON to prevent issues with
    unescaped characters in commit messages.
    """

    # 1. Configuration and Command
    # Use pipe (|) as a guaranteed delimiter for fields, which won't appear
    # in standard Git fields like SHA, message, or date.
    git_log_command = [
        "git",
        "log",
        "-n",
        "100",
        "--no-merges",  # Exclude merge commits for cleaner history
        "--pretty=format:%H|%h|%s|%ci",  # H=full SHA, h=short SHA, s=subject, ci=commit date
    ]

    # Define the output directory relative to the script
    # We use '_generated_static' to prevent the file from being deleted
    # if the source '_static' directory is cleaned by Sphinx.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, "source", "_generated_static")
    output_path = os.path.join(output_dir, "commits.json")

    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    try:
        # 2. Execute the Git command
        result = subprocess.run(
            git_log_command,
            capture_output=True,
            text=True,
            check=True,
            encoding="utf-8",  # Ensure proper handling of commit messages
        )

        commits = []

        # 3. Process the output line by line
        for line in result.stdout.strip().split("\n"):
            if not line:
                continue

            # Split the line by the pipe delimiter, limiting to 3 splits
            # to keep the commit message intact, even if it contains pipes
            # (which shouldn't happen for a subject line, but is safer).
            parts = line.split("|", 3)

            if len(parts) == 4:
                commit_data = {
                    "sha": parts[0],
                    "short_sha": parts[1],
                    # Python handles escaping for the message safely
                    "message": parts[2].strip(),
                    "date": parts[3].strip(),
                }
                commits.append(commit_data)

        # 4. Write the final JSON file
        with open(output_path, "w", encoding="utf-8") as f:
            # json.dump handles all necessary string escaping for valid JSON
            json.dump(commits, f, indent=2)

        print(f"✅ Generated {len(commits)} commits to {output_path}")

    except subprocess.CalledProcessError as e:
        print(f"❌ Error running git command: {e}")
        print(
            "   -> Ensure 'git' is installed and you are running the script inside a git repository."
        )

        # Write an empty list on failure so the JavaScript doesn't crash
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump([], f)

    except FileNotFoundError:
        print("❌ Error: 'git' command not found. Ensure Git is in your system PATH.")
        sys.exit(1)


if __name__ == "__main__":
    # The script should be run from the root of your Sphinx project directory
    generate_commit_json()
