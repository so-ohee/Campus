#### 1. 가상환경 생성(처음 한번만)

```python
python -m venv venv
```



#### 2. 가상환경 실행 - 터미널창에서 (venv) 뜸

```python
source venv/Scripts/activate
```



#### 3. pip 설치 - requirements.txt 안에 있는 것들이 설치됨

```python
pip install -r requirements.txt
```



#### 4. pip 설치목록 저장 - 새로운 것을 설치했을 때만

```python
pip freeze > requirements.txt
```



#### 5. 서버 실행

```
python manage.py runserver
```





#### 모델 정의 후에 마이그레이션 수행

```shell
python manage.py makemigrations
python manage.py migrate
```
