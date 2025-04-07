import time
from django.core.management.base import BaseCommand
import MySQLdb
from django.db.utils import OperationalError

class Command(BaseCommand):
    """Django command to wait for database to be available"""
    
    def handle(self, *args, **options):
        self.stdout.write('Waiting for database...')
        db_up = False
        max_retries = 30
        retry_count = 0
        
        while not db_up and retry_count < max_retries:
            try:
                conn = MySQLdb.connect(
                    host='db',
                    user='root',
                    password='password',
                    database='my_django_db',
                    port=3306
                )
                conn.close()
                db_up = True
            except (OperationalError, MySQLdb.OperationalError) as e:
                self.stdout.write(f'Database unavailable ({e}), waiting 2 seconds... (retry {retry_count}/{max_retries})')
                time.sleep(2)
                retry_count += 1
        
        if db_up:
            self.stdout.write(self.style.SUCCESS('Database available!'))
        else:
            self.stdout.write(self.style.ERROR('Database was not available after maximum retries!'))
            raise Exception('Database connection failed')