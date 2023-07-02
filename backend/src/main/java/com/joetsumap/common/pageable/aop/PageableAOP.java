package com.joetsumap.common.pageable.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.joetsumap.common.pageable.converter.PageRequestConverter;

@Component
@Aspect
public class PageableAOP {

  // 全てのControllerのメソッドに対して、PageableをPageRequestに変換する
    @Around("execution(* com.joetsumap..controller.*Controller.*(..,org.springframework.data.domain.Pageable,..))")
    public Object aop(ProceedingJoinPoint pjp) throws Throwable {
        Object[] args = pjp.getArgs();
        for (int i = 0; i < args.length; i++) {
            Object arg = args[i];
            if (arg instanceof Pageable) {
                args[i] = PageRequestConverter.offsetLimitAndNoSort((Pageable) arg);
            }
        }
        return pjp.proceed(args);
    }
}