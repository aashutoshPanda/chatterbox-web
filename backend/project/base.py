import json
from django.core.exceptions import ImproperlyConfigured
import os

# print(os.listdir())
# print(os.getcwd())

ROOT = os.getcwd()
secret_file = os.path.join(ROOT, "project", 'secrets.txt')
with open(secret_file) as f:
    print(f.read())
    string_data = f.read()
    secrets = json.loads(string_data)

print(secrets)


def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except:
        error_msg = f"{setting} not found in secrets"
        raise ImproperlyConfigured(error_msg)


if __name__ == "__main__":
    print(secrets)
