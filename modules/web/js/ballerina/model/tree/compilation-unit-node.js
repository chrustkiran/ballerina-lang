/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import _ from 'lodash';
import log from 'log';
import AbstractCompilationUnitNode from './abstract-tree/compilation-unit-node';
import TreeUtils from '../tree-util';


class CompilationUnitNode extends AbstractCompilationUnitNode {

    /**
     * Check whether package name is existing one or not.
     *
     * if exist returns true if doesn't return false
     * */
    isExistingPackage(packageName) {
        return !!_.find(this.filterTopLevelNodes({ kind: 'Import' }), (child) => {
            return _.isEqual(child.parent.getPackageName(child), packageName);
        });
    }

    /**
     * Check whether a global with the given identifier exists one or not.
     *
     * if exist returns true if doesn't return false
     * */
    isExistingGlobalIdentifier(identifier) {
        return !!_.find(this.filterTopLevelNodes({ kind: 'Variable' }), (child) => {
            return _.isEqual(child.getName().value, identifier);
        });
    }

    /**
     * Get package name
     */
    getPackageName(node) {
        let pkgName = '';
        if (node.packageName) {
            node.packageName.forEach((identifier) => {
                pkgName = pkgName.concat(identifier.value);
                const index = node.packageName.indexOf(identifier);
                if (index !== node.packageName.length - 1) {
                    pkgName = pkgName.concat('.');
                }
            });
        }
        return pkgName;
    }
    /**
     * Add import as a top level node
     * @param importNode
     */
    addImport(importNode, silent) {
        const pkgName = this.getPackageName(importNode);
        if (this.isExistingPackage(pkgName)) {
            const errorString = 'Package "' + pkgName + '" is already imported.';
            log.debug(errorString);
            return;
        }

        let index = _.findLastIndex(this.filterTopLevelNodes(TreeUtils.isImport));
        const pkgDecl = this.filterTopLevelNodes(TreeUtils.isPackageDeclaration);

        // If there are no imports index is -1. Then we need to add the first import after the package
        // definition which is the first child of the ast root
        index = ((index !== -1) ? (index + 1) : ((pkgDecl.length === 0) ? 0 : 1));

        this.addTopLevelNodes(importNode, index, silent);
    }

    getImports() {
        return this.getTopLevelNodes().filter((node) => {
            return TreeUtils.isImport(node);
        });
    }

    /**
     * Add a global declaration as a top level node
     * @param globalNode
     */
    addGlobal(globalNode, silent) {
        if (!TreeUtils.isVariable(globalNode)) {
            // only constants and global variables can be added at global level
            return;
        }
        // Get index of the last global variable
        let index = _.findLastIndex(this.filterTopLevelNodes(TreeUtils.isVariable));
        // Filter the package declarations from the top level nodes
        const pkgDecl = this.filterTopLevelNodes(TreeUtils.isPackageDeclaration);
        // Get the last index of the imports from the top level nodes
        const lastImportIndex = _.findLastIndex(this.filterTopLevelNodes(TreeUtils.isImport));
        // If there are no variables index is -1. Then we need to add the first variable after the first import
        // which is the first child of the ast root

        index = ((index !== -1) ? (index + 1) : ((lastImportIndex !== -1) ? (lastImportIndex + 1) :
            ((pkgDecl.length === 0) ? 0 : 1)));
        this.addTopLevelNodes(globalNode, index, silent);
    }

    /**
     * Indicates whether the given instance of node can be accepted when dropped
     * on top of this node.
     *
     * @param {Node} node Node instance to be dropped
     * @returns {Boolean} True if can be acceped.
     */
    canAcceptDrop(node) {
        return TreeUtils.isFunction(node)
            || TreeUtils.isConnector(node)
            || TreeUtils.isService(node)
            || TreeUtils.isStruct(node)
            || TreeUtils.isAnnotation(node);
    }

    /**
     * Indicates whether the given instance of node can be accepted when dropped
     * on top of this node.
     *
     * @param {Node} node Node instance to be dropped
     */
    acceptDrop(node) {
        // TODO
        TreeUtils.generateDefaultName(this, node);
        this.addTopLevelNodes(node);
    }

}

export default CompilationUnitNode;
