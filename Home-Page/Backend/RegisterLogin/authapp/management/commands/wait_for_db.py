import time
from django.core.management.base import BaseCommand
import MySQLdb
from django.db.utils import OperationalError

class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write('Waiting for database...')
        max_retries = 10
        
        for i in range(max_retries):
            try:
                conn = MySQLdb.connect(
                    host='db',
                    user='root',
                    password='password',
                    database='my_django_db',
                    port=3306
                )
                conn.close()
                self.stdout.write(self.style.SUCCESS('Database available!'))
                return
            except (OperationalError, MySQLdb.OperationalError) as e:
                self.stdout.write(f'Attempt {i+1}/{max_retries}: Database not ready...')
                time.sleep(5)
        
        self.stdout.write(self.style.ERROR('Database connection failed!'))
        raise Exception('Database not available after maximum retries')
