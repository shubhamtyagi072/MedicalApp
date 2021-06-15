import React, { useState, useCallback } from 'react';
import { Button, TextInput, StyleSheet } from 'react-native';
import  { User } from '@react-native-community/google-signin';
import { GoogleSignin } from '@react-native-community/google-signin';

export function TokenClearingView(userInfo) {
  const [tokenToClear, setToken] = useState('');
  console.warn("userinfo==",userInfo)
  const clearToken = useCallback(
    async () => {
      try {
        await GoogleSignin.clearCachedAccessToken(tokenToClear);
        console.warn('success!');
      } catch (err) {
        console.error(err);
      }
    },
    [tokenToClear]
  );
  return (
    <>
      <TextInput onChangeText={setToken} value={tokenToClear} style={styles.input} />
      <Button title="clear token" onPress={clearToken} />
    </>
  );
}

const styles = StyleSheet.create({
  input: { height: 50, width: 200 },
});