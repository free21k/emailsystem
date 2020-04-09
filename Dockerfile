FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /emailsystem
WORKDIR /emailsystem
ADD requirements.txt /emailsystem/
RUN pip install -r requirements.txt
ADD ./ /emailsystem/
