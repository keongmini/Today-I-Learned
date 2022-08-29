## Sequelize model define 하기

### Sequelize model 정의시 datatype 설정

* 문제상황  

sequelize model define을 이용하여 user model 초기 세팅을 하고자함  
model 정의시 datatype, allowNull 등 옵션을 작성해줄 수 있는데 작성한 부분에서 연속적인 오류 발생

* 해결

1. datatype 정의  
> 사용하는 db 종류에 맞게 datatype을 정의하는 방법이 다름  
> 참고 - [Data Type](https://sequelize.org/docs/v7/other-topics/other-data-types/)  

datatype 정의시에는 대문자로 작성해야함!  
```type: DataTypes.Integer,```  (x)
```type: DataTypes.DateOnly,```  (x)

```type: DataTypes.INTEGER,```  (o)
```type: DataTypes.DATEONLY,```  (o)

2. define 옵션 timestamps가 true가 되어야 datetime 사용 가능

처음 잘못 생각한 부분은 timestamps 옵션이 sequelize에서 자동 생성해주는 createdAt, updatedAt에 대한 옵션인 줄 알았음  
-> timestamps는 DATE datatype을 활성화할지에 대한 옵션이기 때문에 true로 설정해야함!

자동생성되는 컬럼은 다음과 같이 비활성화 가능!
```
createdAt: false,
updatedAt: false
```

