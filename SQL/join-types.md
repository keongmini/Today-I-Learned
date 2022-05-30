## SQL로 두개의 테이블에서 데이터 조회하기

### inner join vs outer join


**join:** 여러 테이블에서 가져온 레코드를 조합하여 하나의 테이블이나 결과 집합으로 표현

1. INNER JOIN  
두 테이블의 정보를 한번에 조회  
    ```
    SELECT * 
    FROM user
    INNER JOIN partner;
    ```
* ON절의 조건을 만족하는 데이터만 호출 -> mysql에서는 WHERE절 사용
    ```
    SELECT * 
    FROM user
    INNER JOIN partner
    ON user.id = partner.buy_id;    
    ```
* mysql에서는 JOIN, INNER JOIN, CROSS JOIN 모두 같은의미로 사용 

    <img width=300 height=250 src="https://user-images.githubusercontent.com/103486036/170906937-2bda30e2-3d0f-4e5a-bbaf-c294ffe0801c.jpg" />  

2. OUTER JOIN   
조건에 해당하지 않는 값도 포함하여 호출 (조건을 만족하지 않는 값의 경우 null로 표시)   
ex) 구매 목록 중 유저 정보와 아이디가 일치하는 목록의 정보를 불러오되 아이디가 일치하지 않는 유저 정보는 함께 조회할 경우 

* LEFT JOIN  
첫번째 테이블을 기준으로 두번째 테이블 조합 -> 조건에 맞게 가져오되 첫번째 테이블은 전부 호출
    ```
    SELECT * 
    FROM user
    LEFT JOIN partner
    ON user.id = partner.buy_id;    
    ```
    ON절 조건을 만족하는 값을 가져오되 user 테이블은 모두 출력  

    <img width=300 height=220 src="https://user-images.githubusercontent.com/103486036/170909126-0a19b77f-3785-45f5-b288-9bce2d3e0297.jpg" />  


* RIGHT JOIN  
LEFT JOIN과 방향이 반대  
두번째 테이블을 기준으로 첫번째 테이블 조합 -> 조건에 맞게 가져오되 두번째 테이블은 전부 호출
    ```
    SELECT * 
    FROM user
    RIGHT JOIN partner
    ON user.id = partner.buy_id;    
    ```
    ON절 조건을 만족하는 값을 가져오되 partner 테이블 모두 출력

**참고:**  
[다중테이블 연산 - JOIN](http://www.tcpschool.com/mysql/mysql_multipleTable_join)  
[INNER JOIN IN SQL SERVER: THE ULTIMATE GUIDE FOR BEGINNERS](https://simplesqltutorials.com/inner-join-ultimate-guide-for-beginners/)