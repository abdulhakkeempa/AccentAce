FROM python:3.10

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN mkdir /code/uploads

RUN chmod 777 /code/uploads

COPY ./ /code/

CMD ["python" , "app.py"]
