/*
 *  Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// This is a generated file. Not intended for manual editing.
package io.ballerina.plugins.idea.psi.impl;

import java.util.List;
import org.jetbrains.annotations.*;
import com.intellij.lang.ASTNode;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.util.PsiTreeUtil;
import static io.ballerina.plugins.idea.psi.BallerinaTypes.*;
import io.ballerina.plugins.idea.stubs.BallerinaEndpointDefinitionStub;
import io.ballerina.plugins.idea.psi.*;
import com.intellij.psi.stubs.IStubElementType;

public class BallerinaEndpointDefinitionImpl extends BallerinaNamedElementImpl<BallerinaEndpointDefinitionStub> implements BallerinaEndpointDefinition {

  public BallerinaEndpointDefinitionImpl(BallerinaEndpointDefinitionStub stub, IStubElementType type) {
    super(stub, type);
  }

  public BallerinaEndpointDefinitionImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull BallerinaVisitor visitor) {
    visitor.visitEndpointDefinition(this);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof BallerinaVisitor) accept((BallerinaVisitor)visitor);
    else super.accept(visitor);
  }

  @Override
  @NotNull
  public List<BallerinaAnnotationAttachment> getAnnotationAttachmentList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, BallerinaAnnotationAttachment.class);
  }

  @Override
  @Nullable
  public BallerinaEndpointInitialization getEndpointInitialization() {
    return PsiTreeUtil.getChildOfType(this, BallerinaEndpointInitialization.class);
  }

  @Override
  @Nullable
  public BallerinaEndpointType getEndpointType() {
    return PsiTreeUtil.getChildOfType(this, BallerinaEndpointType.class);
  }

  @Override
  @Nullable
  public PsiElement getSemicolon() {
    return findChildByType(SEMICOLON);
  }

  @Override
  @NotNull
  public PsiElement getEndpoint() {
    return notNullChild(findChildByType(ENDPOINT));
  }

  @Override
  @Nullable
  public PsiElement getIdentifier() {
    return findChildByType(IDENTIFIER);
  }

}
